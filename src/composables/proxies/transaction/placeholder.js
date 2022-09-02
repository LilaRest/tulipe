import { Status, dapp, rSet, rGet } from "../../../index.js";
import { ref } from "vue";

export class TulipeTransactionPlaceholder {
    constructor (contractName, methodName, args=[], txArgs={value: 0}) {
      // Initialize additional properties.
      this.contractName = contractName;
      this.methodName = methodName;
      this.methodInfos = {};
      this.args = ref(args);
      this.txArgs = ref(txArgs);
      this.data = ref([]);
      this.error = ref(null);
      this.call = null;

      // Initialize status instance.
      this.status = new Status(`tx:${contractName}:${methodName}`, [
        "NOT_READY",
        "READY",
        "SENT",
        "ERROR",
        "SUCCESS"
      ]);
    }

    initARS () {
      // 1) Fallback to READY after few seconds or ERROR or SUCCESS status
      this.status.watch(["ERROR", "SUCCESS"], () => {
        setTimeout(() => {
          this.status.set("READY");
        }, 3000);
      });
    }

    _asyncInit () {
        if (dapp.contracts[this.contractName].isReadSafe.value) {
            this._initEthersInstance();
        }
        dapp.contracts[this.contractName].onReadSafe(() => {
            this._initEthersInstance();
        })

        // Init transaction ARS
        this.initARS()
    }

    _initEthersInstance () {
        this.methodInfos = dapp.contracts[this.contractName].interface.functions[this.methodName];
        this.methodInfos.inputs.forEach(i => this.args.value.push(null));
        this.methodInfos.outputs.forEach(i => this.data.value.push(null));
        this.proxy.ethersInstance = dapp.contracts[this.contractName][this.methodName];
        this.status.set("READY");
    }

    send (args=null, txArgs=null) {
      args = args && args.length > 0 ? args : rGet(this.args);

        if (args) {
            if (Array.isArray(args)) {
                this.call = this.proxy.ethersInstance(...args, txArgs)
            }
            else {
                this.call = this.proxy.ethersInstance(args, txArgs)
            }
        }
        else {
            this.call = this.proxy.ethersInstance(txArgs)
        }

        this.status.set("SENT");

        if (this.methodInfos.constant) {
            this.call
            .then((val) => {
                 if (!Array.isArray(val)) {
                    val = [val]; // new Array enforce that the returned data is an array for more predicable returns.
                 }
                 rSet(this.data, val);
                 rSet(this.error, null)
                 this.status.set("SUCCESS");
             })
            .catch((err) => {
                 rSet(this.error, err);
                 this.status.set("ERROR");
             })
        }
        else {
            this.call
                .then((tx) => {
                    return tx.wait();
                })
            .then((val) => {
                if (!Array.isArray(val)) {
                    val = [val]; // new Array enforce that the returned data is an array for more predicable returns.
                 }
                 rSet(this.data, val);
                 rSet(this.error, null)
                 this.status.set("SUCCESS");
             })
            .catch((err) => {
                 rSet(this.error, err);
                 this.status.set("ERROR");
                 console.log(err)
             })
        }
    }
}
