/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
var cart = new Cart([]);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  if (localStorage.getItem('cart')) {
    var cartItemArray = JSON.parse(localStorage.getItem('cart'));
    for (var i = 0; i < cartItemArray.length; i++) {
      var itemHeaderEl = document.createElement('h2');
      itemHeaderEl.textContent = cartItemArray[i].product + ' Quantity: ' + cartItemArray[i].quantity;
      cartContentsNode.appendChild(itemHeaderEl);
    }
  }
  //Add an <option> tag inside the form's select for each product
  var selectElement = document.getElementById('items');
  for (var i in Product.allProducts) {
    var optionEl = document.createElement('option');
    optionEl.value = Product.allProducts[i].name.toLowerCase();
    optionEl.textContent = Product.allProducts[i].name;
    selectElement.appendChild(optionEl);

  }
}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {

  // Prevent the page from reloading
  event.preventDefault();
  // Do all the things ...
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();
}

//Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  console.log(event.target.items.value);
  // suss out the item picked from the select list
  var itemValue = event.target.items.value;
  console.log(event.target.quantity.value);
  // get the quantity
  var itemQuantity = event.target.quantity.value;
  //using those, add one item to the Cart
  cart.addItem(itemValue, itemQuantity);
}

//Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  var itemCount = document.getElementById('itemCount');
  if (localStorage.getItem('cart')) {
    itemCount.textContent = JSON.parse(localStorage.getItem('cart')).length;
  } else {
    itemCount.textContent = cart.items.length;
  }
}

// As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  var cartContentsNode = document.getElementById('cartContents');
  var cartItemArray;
  var itemHeaderEl;
  cartItemArray = JSON.parse(localStorage.getItem('cart'));
  itemHeaderEl = document.createElement('h2');
  var i = cartItemArray.length - 1;
  itemHeaderEl.textContent = cartItemArray[i].product + ' Quantity: ' + cartItemArray[i].quantity;
  console.log(itemHeaderEl.textContent);
  cartContentsNode.appendChild(itemHeaderEl);
}
  
  // Get the item and quantity from the form
  //Add a new element to the cartContents div with that information

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
updateCartPreview();