import "lazysizes"
import Swiper from 'swiper';
import CartJS from 'shopify-cartjs'

/**
 * Cart.js
 * https://cartjs.org/
 */
const cartJSON = JSON.parse(document.getElementById('cart-json').innerHTML);
CartJS.init(cartJSON, {
  requestBodyClass: "cart-loading"
})

/**
 * Assing global variables/scripts to window
 */
window.CartJS = CartJS;
window.Swiper = Swiper;

