console.log('Common.js loaded');

/**
 * Cart.js
 * https://cartjs.org/
 */
const cartJSON = JSON.parse(document.getElementById('cart-json').innerHTML);
console.log(cartJSON);
CartJS.init(cartJSON, {
  requestBodyClass: "cart-loading"
})