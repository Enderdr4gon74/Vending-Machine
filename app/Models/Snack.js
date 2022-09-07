export class Snack {
  constructor(name, price, quantity, image) {
    this.name = name
    this.price = price
    this.quantity = quantity
    this.image = image
  }

  addToCart() {
    this.quantity++
  }

  minusFromCart() {
    this.quantity--
  }

  get Template() {
    return `
    <div class="col-12 col-md-4 height-30">
      <img class="img-fluid" src="${this.image}" alt="${this.name}">
      <div class="d-flex justify-content-between">
        <h3>${this.name}</h3>
        <h3>$${this.price}</h3>
      </div>
      <button class="btn btn-info width-100" onclick="app.snacksController.addToCart('${this.name}')"><i class="mdi mdi-plus-thick"></i> <i class="mdi mdi-arrow-right-bold"></i> <i class="mdi mdi-cart"></i></button>
    </div>
    `
  }

  get ReceiptTemplate() {
    return `
    
    `
  }
}