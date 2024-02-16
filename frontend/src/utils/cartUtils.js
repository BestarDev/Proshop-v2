export const addDecimals = (num) => {
    return Number((Math.round(num * 100) / 100).toFixed(2))
}

export const updateState = (state) => {
    // Calculate Item Price
    state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))

    // Calculate Shipping Price
    state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10)

    // Calculate Tax Price
    state.taxPrice = addDecimals(state.itemsPrice * 0.15);

    // Calculate Total Price
    state.totalPrice = Number((state.itemsPrice + state.shippingPrice + state.taxPrice).toFixed(2));

    localStorage.setItem('cart', JSON.stringify(state));

    return state;
}