import { appState } from "../AppState.js";
import { snacksService } from "../Services/snacksService.js";

function _drawSnacks() {
  // SECTION draw snacks
  let snacks = appState.snacks
  let template = ''
  snacks.forEach(p => template += p.Template)
  let snackElement = document.getElementById('snacks')
  if (snackElement) {
    snackElement.innerHTML = template
  }
  // SECTION draw receipt
  let receiptElement = document.getElementById("receipt")
  let subTotal = 0
  for (let i = 0; i < snacks.length; i++) {
    subTotal += (snacks[i].price*snacks[i].quantity)
  }
  subTotal = (Math.round((subTotal)*100))/100 
  let tax = (Math.round((subTotal*0.06)*100))/100
  let total = (Math.round((subTotal + tax)*100))/100
  let receiptTemplate = `
  <div class="d-flex justify-content-between">
    <h3>SubTotal: $${subTotal}</h3>
    <h3>Tax: $${tax}</h3>
    <h3>Total: $${total}</h3>
  </div>
  `
  for (let i = 0; i < snacks.length; i++) {
    if (snacks[i].quantity > 0) {
      receiptTemplate += `
      <div class="d-flex justify-content-between align-items-center mt-3">
        <div class="d-flex flex-column align-items-start">
          <h3>${snacks[i].name}</h3>
          <h3>${snacks[i].price} * ${snacks[i].quantity} = ${(Math.round((snacks[i].price * snacks[i].quantity)*100))/100}</h3>
        </div>
        <button class="btn btn-danger" onclick="app.snacksController.minusFromCart('${snacks[i].name}')"><i class="mdi mdi-delete-outline"></i></button>
      </div>
      `
    }
  }
  receiptTemplate += `
  <div class="d-flex justify-content-end mt-3">
    <button class="btn btn-success" onclick="app.snacksController.resetCart()">Purchase</button>
  </div>
  `
  if (receiptElement) {
    receiptElement.innerHTML = receiptTemplate
  }
}

export class SnacksController {

  constructor() {
    _drawSnacks()
  }

  addToCart(name) {
    snacksService.addToCart(name)
    _drawSnacks()
  }

  minusFromCart(name) {
    snacksService.minusFromCart(name)
    _drawSnacks()
  }

  resetCart() {
    let snacks = appState.snacks
    let condition = false
    for (let i = 0; i < snacks.length; i++) {
      if (snacks[i].quantity > 0) {
        condition = true
      }
    }
    if (condition) {
      let message = "You purchased: "
      let extra1 = ""
      let extra2 = " "
      let num1 = 0
      for (let i = 0; i < snacks.length; i++) {
        if (snacks[i].quantity > 0) {
          num1++
        }
      }
      for (let i = 0; i < snacks.length; i++) {
        extra2 = " "
        extra1 = ""
        if (snacks[i].quantity > 0) {
          if (snacks[i].quantity > 1 && snacks[i].name != "Snickers") {
            extra1 = "s"
          }
          if (num1 > 1 && i != (snacks.length-1)) {
            extra2 = ", "
          } if (num1 > 1 && i == (snacks.length-2)) {
            extra2 = ", and "
          }
          message += snacks[i].quantity + " " + snacks[i].name + extra1 + extra2
        }
        snacks[i].quantity = 0
      }
      window.alert(message)
      _drawSnacks()
    }
  }
}