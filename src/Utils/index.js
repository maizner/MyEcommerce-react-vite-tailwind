/** 
* This function calculates total price of a new order
* @param {array} products cartProducts: Array of Objects
* @returns {number} Total Price
*/
export const totalPrice = (products) => {

    let sum = 0
    products.forEach(product => sum += product.price * product.quantity);
    return sum
}