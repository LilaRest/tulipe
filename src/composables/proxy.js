import { markRaw } from "vue";

function getAllPropertyNames(obj) {
  var result = [];
  while (obj && obj !== Object.prototype) {
    result.push.apply(result, Object.getOwnPropertyNames(obj));
    obj = Object.getPrototypeOf(obj);
  }
  return result;
}

class ProxyMethods {
  constructor(ethersObjectProxy) {
    this._parent = ethersObjectProxy;
  }

  setEthersObject (ethersObject) {
    this._parent._ethersObject = ethersObject ? markRaw(ethersObject) : ethersObject;
    this.extendsEthersObject();
  }

  getEthersObject () {
    return this._parent._ethersObject;
  }

  extendsEthersObject () {
    if (this._parent._ethersObject && this._parent._extensionObject) {
      const extensionObjectProperties = getAllPropertyNames(this._parent._extensionObject);
      for (const property of extensionObjectProperties) {
        if (property !== "constructor") {
          try {
            this._parent._ethersObject[property] = this._parent._extensionObject[property].bind(this._parent._ethersObject);
          }
          catch (e) {
            if (e instanceof TypeError) {
              this._parent._ethersObject[property] = this._parent._extensionObject[property];
            }
            else {
              throw e;
            }
          }
        }
      }
    }
  }
}

export class EthersObjectProxy {

  constructor (ethersObject=null, extensionObject=null) {
    this._ethersObject = null;
    this._extensionObject = extensionObject;
    this.proxy = new ProxyMethods(this);
    this.proxy.setEthersObject(ethersObject);

    return new Proxy(this, {
      get: function(target, prop, receiver) {
        if (target._ethersObject && target._ethersObject[prop]) {
          try {
            return target._ethersObject[prop].bind(target._ethersObject);
          }
          catch (e) {
            if (e.message.includes(".bind is not a function")) {
              return target._ethersObject[prop];
            }
            throw e;
          }
        }
        else if (target[prop]) {
          return target[prop];
        }
        return undefined
      },
      set: function(target, prop, value) {
        if (target._ethersObject && target._ethersObject[prop]) {
          target._ethersObject[prop] = value;
          return true;
        }
        else {
          target[prop] = value;
          return true;
        }
      }  
    });
  } 
}












// return new Proxy(this, {
//   get: function(target, prop, receiver) {
//     if (target._ethersObjectProperties.includes(prop)) {
//       return target._ethersObject[prop];
//     }
//     else if (target._proxyProperties.includes(prop)) {
//       return target[prop];
//     }
//     return undefined
//   },
//   set: function(target, prop, value) {
//     if (target._proxyProperties.includes(prop)) {
//       target[prop] = value;
//       return true
//     }
//     else if (target._ethersObject) {
//       target._ethersObject[prop] = value;
//       return true
//     }
//     throw(`MixedStore object doesn't have any property called '${prop}'. New properties cannot be set / removed directly on a MixedStore object, please use add() and remove() methods of the store.`)
//   }  
// });
