import { Status } from "../../index.js";
import { EthersObjectProxy } from "../proxy.js";
import { EthersTransactionExtension } from "./transaction-extension.js";

export class EthersTransactionProxy extends EthersObjectProxy {
    constructor (func, ethersObject=null) {
        const extensionObject = new EthersTransactionExtension() 
        super(ethersObject, extensionObject)

        this.func = func;
        this.constant = false;
        this.status = new Status(`tx`, [
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
        this.data = null;
        this.error = null;
        this.call = null;
    }

    send (args=[], txArgs={}) {
        if (args) {
            if (Array.isArray(args)) {
                this.call = this.func(...args, txArgs)
            }
            else {
                this.call = this.func(args, txArgs)
            }
        }
        else {
            this.call = this.func(txArgs)
        }

        this.status.set("SENT");

        if (this.constant) {
            this.call
            .then((val) => {
                 this.data = val;
                 this.status.set("SUCCESS");
             })
            .catch((err) => {
                 this.error = err;
                 this.status.set("ERROR");
             })
        }
        else {
            this.call
                .then((tx) => {
                    return tx.wait();
                })
            .then((val) => {
                 this.data = val;
                 this.status.set("SUCCESS");
             })    
            .catch((err) => {
                 this.error = err;
                 this.status.set("ERROR");
             })
        }
    }
}
