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
  for (var i = 0; i < tableBody.length; i++){
    tableBody.childNodes[i].removeChild();
  }
}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {

  // TODO: Find the table body
  var tableBody = table.childNodes[3];
  console.log(tableBody);
  clearCart();
  // TODO: Iterate over the items in the cart
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
  // TODO: Create a TR
  // TODO: Create a TD for the delete link, quantity,  and the item
  // TODO: Add the TR to the TBODY and each of the TD's to the TR

}

function removeItemFromCart(event) {
  console.log(event.target.id);
  cart.removeItem(event.target.id);
  cart.saveToLocalStorage();
  renderCart();
  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  // TODO: Save the cart back to local storage
  // TODO: Re-draw the cart table

}

// This will initialize the page and draw the cart on screen
renderCart();