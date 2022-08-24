import { isRef } from "vue";

export function rSet(possibleNestedRef, value) {
    /* 
     * This function allows to safely (in a more consistent and predicable way) set the value of a Ref that could be possibly nested in another deeply reactive object.
     See : https://vuejs.org/guide/essentials/reactivity-fundamentals.html#ref-unwrapping-in-reactive-objects
    */
    if (isRef(possibleNestedRef)) {
        possibleNestedRef.value = value;
    }
    else {
        possibleNestedRef = value;
    }
}

