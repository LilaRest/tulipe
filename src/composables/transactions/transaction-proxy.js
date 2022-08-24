import { Status, dapp, rSet, rGet } from "../../index.js";
import { EthersObjectProxy } from "../proxy.js";
import { EthersTransactionExtension } from "./transaction-extension.js";
import { ref } from "vue";

export class EthersTransactionProxy extends EthersObjectProxy {
    constructor (contractName, methodName, args=[], txArgs={value: 0}) {
        super(null, new EthersTransactionExtension())
            
        this.contractName = contractName;
        this.methodName = methodName;
        this.methodInfos = {};
        this.args = ref(args);
        this.txArgs = ref(txArgs);
        this.status = new Status(`tx:${contractName}:${methodName}`, [
          "NOT_READY",
          "READY",
          "SENT",
          "ERROR",
          "SUCCESS"
        ]);
        this.status.watch(["ERROR", "SUCCESS"], () => {
          setTimeout(() => {
            this.status.set("READY");
          }, 3000);
        });
        this.data = ref([]);
        this.error = ref(null);
        this.call = null;

        this._init();
    }

    _init () {
        if (dapp.contracts[this.contractName].isReadSafe.value) {
            this._initEthersObject();
        }
        dapp.contracts[this.contractName].onReadSafe(() => {
            this._initEthersObject();
        })
    }

    _initEthersObject () {
        this.methodInfos = dapp.contracts[this.contractName].interface.functions[this.methodName];
        this.methodInfos.inputs.forEach(i => this.args.value.push(null));
        this.methodInfos.outputs.forEach(i => this.data.value.push(null));
        this.proxy.setEthersObject(dapp.contracts[this.contractName][this.methodName]);
        this.status.set("READY");
    }

    send (args=null, txArgs=null) {
        args = args ? args : rGet(this.args);
        txArgs = txArgs ? txArgs : rGet(this.txArgs);

        if (args) {
            if (Array.isArray(args)) {
                this.call = this.proxy.getEthersObject()(...args, txArgs)
            }
            else {
                this.call = this.proxy.getEthersObject()(args, txArgs)
            }
        }
        else {
            this.call = this.proxy.getEthersObject()(txArgs)
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
             })
        }
    }
}
