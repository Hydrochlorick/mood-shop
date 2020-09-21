import data from './data.js'

const itemsContainer = document.getElementById('items')

for (let i=0; i<data.length; ++i) {
  // Create a new Div for every data item
  let newDiv = document.createElement('div');
  // Give it the class name "item"
    newDiv.className = 'item'
  // Create the img element with fixed size from data object
  let img = document.createElement('img')
  img.src = data[i].image
  img.width = 300
  img.height = 300
  // Add img tag as a child of the new Div
  newDiv.appendChild(img)
  
  let desc = document.createElement('P')
  desc.innerText = data[i].desc
  newDiv.appendChild(desc)
  let price = document.createElement('P')
  price.innerText = data[i].price
  newDiv.appendChild(price)
  
  let button = document.createElement('button')
  button.id = data[i].name
  
  button.dataset.price = data[i].price
  button.innerHTML = "Add to Cart"
  newDiv.appendChild(button)
  itemsContainer.appendChild(newDiv)
}


const cart = []

// Add item -------------------------------------------------
function addItem(name, price) {
  for (let i = 0; i < cart.length; i +=1 ) {
    if (cart[i].name === name) {
      cart[i].qty += 1
      return
    }
  }
  const item = {name, price, qty: 1}
  cart.push(item)
}

function remoteItem(name, qty = 0) {
  for (let i =0; i < cart.length; i += 1) {
    if (cart[i].name === name) {
      if (qty > 0) {
        cart[i].qty -= qty
      }
      if (cart[i].qty < 1 || qty ===0) {
        cart.splice(i, 1)
      }
      return
    }
  }
}

function showItems() {
  
  console.log(`You have ${getQty()} items in your cart.`)

  for (let i = 0; i < cart.length; i +=1 ) {
    console.log(`- ${cart[i].name} ${cart[i].price} x ${cart[i].qty}`)
  }

 
  let total = getTotal()
  console.log(`Total in cart: $${total}`)

  function getQty() {
    let qty = 0
    for (let i = 0; i < cart.length; i += 1) {
      qty += cart[i].qty
    }
    return qty
  }

  function getTotal() {
    for (let i = 0; i < cart.length; i += 1) {
      total += cart[i].price * cart[i].qty
    }
    return total.toFixed(2)
  }

}