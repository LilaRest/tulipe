import { ref } from "vue";
import { Status } from "../index.js";


export class Transaction {
    constructor (func) {
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
                    console.log("TX")
                    console.log(tx);
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
