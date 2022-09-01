## Deep reactivity problem

By default reactive objects are deeply reactive in Vue which means that any sub-objects, array, or values are made reactive when their parent is wrapped in `ref()` or `reactive()`.
This behavior is sometimes wanted to track changes in an entire object but sometimes we just want to track if the root object changes and it's so unecessary to track the entire's object changes.
In addition, in case the object we made deeply reactive already contains some reactive children, those ones are unwrapped (they can be accessed without `.value`). 
This behavior is not insignificant as it can breaks the logic of sub objects : Their methods are using `.value` to access the values of their properties, but once they are unwrapped all those methods will be broken because `.value` should not anymore be used to access properties' values.

To solve that problem and to allows tracking only the root object, Vue introduced the concept of "Shallow Refs".

Tulipe object have been made as resilient as possible but in some case if they are made deeply reactive, some unexpected behaviors could occur.
That's why you should never made a Tulipe object deeply reactive even if you know what you do.
Instead use shallow refs :
```js
// Normal Vue
import { ref, shallowRef } from "vue";
const tx = ref(EthersTransactionProxy())            // MUST BE AVOIDED
const tx = shallowRef(EthersTransactionProxy())     // Recommended practice

// With Reactivity Transform
const tx = $ref(EthersTransactionProxy())            // MUST BE AVOIDED
const tx = $shallowRef(EthersTransactionProxy())     // Recommended practice
```


### Resilient reactive getters and setters
If you plan to work with deeply reactive Tulipe objects, this ones provides you with two methods that allows to get or set the value of a possibily nested reactive object :
- `rGet(<possiblyNestedReactiveObject>)`
- `rSet(<possiblyNestedReactiveObject>, <newValue>)`
These methods are pretty simple, they use the `isRef()` method provided by Vue to determine if the `<possiblyNestedReactiveObject>` is a Ref or not (if not it means that is has been unwrapped) and so to determine if it must be set or get using `.value` or not.

The `r` before `Get` and `Set` stands for `resilient/reactive Get/Set`.

All the Tulipe objects are internally using those methods to makes it as resilient as possible.
