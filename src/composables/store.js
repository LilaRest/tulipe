/*
  MixedStore class :
  This class has been created to offer more flexibility over classic stores like the ones offered by Pinia.

  Problem :
  When defining a Pinia store using the defineStore() method, Pinia simply create a reactive object and fills it with additional native methods as well as with all the variables / properties (it depends if it is defined using the Composition API or the Options API) and methods defined in defineStore(). 
  By default, Vue's state (reactive objects) are deeply reactive, which means that any of their properties, sub-objects, sub-objects's properties, etc. are proxied to allows Vue to track them. See : https://vuejs.org/guide/essentials/reactivity-fundamentals.html#deep-reactivity
  Because Pinia stores are simple reactive objects, all the variables / properties defined in the defineStore() will be proxied by Vue.
  This leads to two major problems :
  - In many case, much more objects are tracked by Vue than necessary (developers don't have a fine grained control about what is reactive and what is not).
  - In some rarest cases (but its the case in Vuethers), the store have to hold instance created by a class that produces objects with one or many reactive properties. In that case Pinia will fully break the logic of the class by making reactive the whole store itself and so by removing the '.value' of those reactive properties. By the way it seems to be a good practice to use objects with only few required reactive properties, but such stores don't allow it.
  
  Vuethers want to provides an easy to use experience by storing all the DApp datas under the 'dapp' object. This object has two contains 3 types of datas :
  - stateless datas
  - stateful datas
  - nested stafeful datas (stateless objects that holds stateful sub-objects as properties or sub-objects' properties)

  While in stores like Pinia only stateful datas can be stored, the MixedStore class allows to stores these 3 kind of datas under the same object.
  In reality this is a Proxy object that is able to pick datas from :
  - A stateless object
    - that can hold stateless datas
    - that can hold nested stateful datas 
  - A stateful object
    - that can hold stateful datas
  When a property is requested to that proxy, this one will automatically pick the datas from the right source.

  It is called MixedStore because it behave like a data store that can holds mixed types of datas.
*/

export class MixedStore extends Object {
  constructor (items, statelessSource, statefulSource) {
    super()
    super.constructor()
    this._items = items;
    this._statelessSource = statelessSource;
    this._statefulSource = statefulSource;

   for (const [name, target] of Object.entries(items)) {
      if (!["stateless", "stateful"].includes(target)) {
        throw(`Mixed stores items must have 'stateless' or 'stateful' as value. Got; ${target} for item '${name}'`)
      }
    }
    return new Proxy(this, {
      get: function(target, prop, receiver) {
        if (Object.keys(target._items).includes(prop)) {
          const itemTarget = target._items[prop];
          if (itemTarget === "stateless") {
            return target._statelessSource[prop];
          }
          else if (itemTarget === "stateful") {
            return target._statefulSource[prop];
          }
        }
      },
      set: function(target, prop, value) {
        if (Object.keys(target._items).includes(prop)) {
          const itemTarget = target._items[prop];
          if (itemTarget === "stateless") {
            target._statelessSource[prop] = value;
          }
          else if (itemTarget === "stateful") {
            target._statefulSource[prop] = value;
          }
        }      
        return true
      }
    })
  }
}

