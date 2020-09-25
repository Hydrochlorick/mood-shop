import data from './data.js'

const itemsContainer = document.getElementById('items')
const itemsList = document.getElementById('item-list')
const cartQty = document.getElementById('cart-qty')
const cartTotal = document.getElementById('cart-total')

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

// Handle clicks in itemList --------------------------------
itemsList.onclick = function(e) {
  if (e.target && e.target.classList.contains('remove')) {
    const name = e.target.dataset.name
    remoteItem(name)
  } else if (e.target && e.target.classList.contains('add-one')) {
    const name = e.target.dataset.name
    addItem(name)
  } else if (e.target && e.target.classList.contains('remove-one')) {
    const name = e.target.dataset.name
    remoteItem(name, 1)
  }
}

// Listen for changes to form in itemList
// onchange doesn't update *as* you're typing, but once the field is no longer active (you click away)
itemsList.onchange = function(e) {
  if (e.target && e.target.classList.contains('update')) {
    const name = e.target.dataset.name
    const qty = parseInt(e.target.value)
    
    updateCart(name, qty)
  }
}

// Add item -------------------------------------------------
function addItem(name, price) {
  for (let i = 0; i < cart.length; i +=1 ) {
    if (cart[i].name === name) {
      cart[i].qty += 1
      showItems()
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
      showItems()
      return
    }
  }
}

function updateCart(name, qty) {
  for (let i = 0; i < cart.length; i += 1) {
    if (cart[i].name === name) {
      if (qty < 1) {
        remoteItem(name)
        return
      }
      cart[i].qty = qty
      showItems()
      return
    }
  }
}

// Show Items at bottom of screen -------------------------------------------
function showItems() {
  const qty = getQty()
  cartQty.innerHTML = `You have ${qty} items in your cart.`

  let itemStr = ''
  for (let i = 0; i < cart.length; i +=1 ) {
    // Create 3 variables in one ine of code. Only works because cart[i] is an object matching that exact syntax.
    const {name, price, qty} = cart[i]

    itemStr += `<li>
    ${name} ${price} x ${qty} = ${qty * price}
    <button class="remove" data-name="${name}">Remove</button>
    <button class="add-one" data-name="${name}"> + </button>
    <button class="remove-one" data-name="${name}"> - </button>
    <input class="update" type="number" min="0" data-name="${name}">
    </li>`
  }
  itemsList.innerHTML = itemStr
 
  const total = getTotal()
  cartTotal.innerHTML = `Total in cart: $${total}`
}

const all_items_button = Array.from(document.querySelectorAll('button'))
all_items_button.forEach( elt => elt.addEventListener('click', () => {
  addItem(elt.getAttribute('id'), elt.getAttribute('data-price'))
  showItems()
}))

function getQty() {
  let qty = 0
  for (let i = 0; i < cart.length; i += 1) {
    qty += cart[i].qty
  }
  return qty
}

function getTotal() {
  let total = 0
  for (let i = 0; i < cart.length; i += 1) {
    total += cart[i].price * cart[i].qty
  }
  return total.toFixed(2)
}