/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
var table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
var cart;

function loadCart() {
  var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  var tableBody = table.childNodes[3];
  for (var i = 0; i < tableBody.childNodes.length; i++){
    tableBody.removeChild(tableBody.childNodes[i]);
  }
}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {
  clearCart();
  // TODO: Find the table body
  var tableBody = table.childNodes[3];
  // TODO: Iterate over the items in the cart and add rows
  for (var i = 0; i < cart.items.length; i++) {
    var trEl = document.createElement('tr');

    var deleteTd = document.createElement('td');
    deleteTd.id = cart.items[i].product;
    deleteTd.textContent = 'X';
    trEl.appendChild(deleteTd);

    var quantityTd = document.createElement('td');
    quantityTd.textContent = cart.items[i].quantity;
    trEl.appendChild(quantityTd);

    var productTd = document.createElement('td');
    productTd.textContent = cart.items[i].product;
    trEl.appendChild(productTd);

    tableBody.appendChild(trEl);
  }

}

function removeItemFromCart(event) {
  cart.removeItem(event.target.id);
  cart.saveToLocalStorage();
  clearCart();

  renderCart();
  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  // TODO: Save the cart back to local storage
  // TODO: Re-draw the cart table

}

// This will initialize the page and draw the cart on screen
renderCart();