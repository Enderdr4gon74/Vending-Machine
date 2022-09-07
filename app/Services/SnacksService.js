import { appState } from "../AppState.js";


class SnacksService {

  addToCart(name) {
    let snack = appState.snacks.find(p => p.name == name)
    snack?.addToCart()
  }

  minusFromCart(name) {
    let snack = appState.snacks.find(p => p.name == name)
    snack?.minusFromCart()
  }

}

// NOTE export services as consts so they are now un-changeable
export const snacksService = new SnacksService()