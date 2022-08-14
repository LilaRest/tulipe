import { watch } from "vue";

export default class Status {

  constructor (name, states) {
    this._name = name;
    const state = $ref(null);
    this._state = state;
    this.states = [];

    // Ensure that the given states is an array of strings.
    if (Array.isArray(states)) {
      for (const state of states) {
        this.states.push(this._formatState(state))
      }
    }
    else {
      throw(`The 'states' parameter of a Status instance '${name}' must an array of strings. Got: ${states}`)
    }
  }

  _formatState(state) {
    return state.toString().toUpperCase();
  }

  _isStateValid(state) {
    if (this.states.includes(this._formatState(state))) {
      return true
    }
    return false
  }

  _areStatesValid(states) {
    for (const state of states) {
      if (!this._isStateValid(state)) {
        return false
      }
    }
    return true
  }

  get() {
    return this._state;
  }

  set(state) {
    state = this._formatState(state);
    if (this._isStateValid(state)) {
      this._state = state;
    }
    else {
      throw(`The state given to the set() method of Status instance '${this._name}' must a value in ${this.states}. Got: ${state}`)
    }
  }
 
  is(state) {
    if (this._isStateValid(state)) {
      return this.get() == this._formatState(state);
    }
    throw(`The state given to the is() method of Status instance '${this._name}' must a value in ${this.states}. Got: ${state}`)
  }

  isIn(states) {
    if (this._areStatesValid(states)){
      for (const state of states) {
        if (this.is(state)) {
          return true
        }
      }
      return false
    }
    throw(`The states given to the isIn() method of Status instance '${this._name}' must be an array with values in ${this.states}. Got: ${states}`)
  }

  watch(callback) {
    watch(this.get(), () => {
      callback(this.get())
    })
  }

  watchState(state, callback) {
    if (this._isStateValid(state)) {
      watch(this.get(), (newValue, oldValue) => {
        if (this.is(state)) {
          callback(this.get())
        }
      }) 
    }
    else {
      throw(`The state given to the watchState() method of Status instance '${this._name}' must a value in ${this.states}. Got: ${state}`)
    }
  }
  watchStates(states, callback) {
    if (this._areStatesValid(states)){
      watch(this.get(), () => {
        if (this.isIn(states)) {
          callback(this.get())
        }
      })
    }
    else {
      throw(`The states given to the watchStates() method of Status instance '${this._name}' must be an array with values in ${this.states}. Got: ${states}`)
    }
  }
}
