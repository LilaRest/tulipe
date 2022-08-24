import { Status, dapp, rSet } from "../../index.js";
import { EthersObjectProxy } from "../proxy.js";
import { EthersTransactionExtension } from "./transaction-extension.js";
import { ref } from "vue";

export class EthersTransactionProxy extends EthersObjectProxy {
    constructor (contractName, methodName) {
        let tx = null;
        const contract = dapp.contracts[contractName];
        if (contract) {
            tx = contract[methodName];
        }
        if (!tx) {
            throw `Cannot create EthersTransactionExtension object for method ${methodName} of ${contractName}. One of them doesn't exist.`
        }
        super(tx, new EthersTransactionExtension())

        this.txInfos = contract.interface.functions[methodName];
        this.status = new Status(`tx:${contractName}:${methodName}`, [
          "UNSENT",
          "SENT",
          "ERROR",
          "SUCCESS"
        ]);
        this.status.watch(["ERROR", "SUCCESS"], () => {
          setTimeout(() => {
            this.status.set("UNSENT");
          }, 5000);
        });
        this.data = ref(null);
        this.error = ref(null);
        this.call = null;
    }

    send (args=[], txArgs={}) {
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

        if (this.txInfos.constant) {
            this.call
            .then((val) => {
                 rSet(this.data, val);
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
                 rSet(this.data, val);
                 this.status.set("SUCCESS");
             })    
            .catch((err) => {
                 rSet(this.error, err);
                 this.status.set("ERROR");
             })
        }
    }
}
