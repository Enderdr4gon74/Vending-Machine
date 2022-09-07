import { Value } from "./Models/Value.js"
import { Snack } from "./Models/Snack.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"
import { loadState } from "./Utils/Store.js"

class AppState extends EventEmitter {
  /** @type {import('./Models/Value').Value[]} */
  values = loadState('values', Value)

  /** @type {import("./Models/Snack").Snack[]} */
  snacks = [new Snack("Hershey", 1.99, 0, "assets/img/Hersheys.png"), new Snack("KitKat", 2.49, 0, "assets/img/KitKat.png"), new Snack("TwixLeft", 2.99, 0, "assets/img/TwixLeft.png"), new Snack("TwixRight", 3.49, 0, "assets/img/TwixRight.png"), new Snack("MilkyWay", 3.99, 0, "assets/img/MilkyWay.png"), new Snack("Snickers", 4.49, 0, "assets/img/Snickers.png")]

}

export const appState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
