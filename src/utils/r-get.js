import { isRef } from "vue";

export function rGet(possibleNestedRef) {
    /*
     * This function allows to safely (in a more consistent and predicable way) get the value of a Ref that could be possibly nested in another deeply reactive object.
     See : https://vuejs.org/guide/essentials/reactivity-fundamentals.html#ref-unwrapping-in-reactive-objects
    */
    if (isRef(possibleNestedRef)) {
        return rGet(possibleNestedRef.value);
    }
    else {
        return possibleNestedRef;
    }
}
