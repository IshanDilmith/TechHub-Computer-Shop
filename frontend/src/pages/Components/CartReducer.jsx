export const totalItems = (cart) => {
    return cart.reduce((sum, item) => sum + item.cartUsage, 0);
}

export const totalPrice = (cart) => {
    return cart.reduce((total, item) => total + item.cartUsage * item.itemPrice, 0);
}


const CartReducer = (state, action) => {
    let updatedState;

    switch (action.type) {
        case "Add":
            if (!action.userId) return state; // Prevent action if userId is missing
            const existingItem = state.find(item => item._id === action.item._id);
            if (existingItem) {
                updatedState = state.map(item =>
                    item._id === action.item._id
                        ? { ...item, cartUsage: item.cartUsage + action.item.cartUsage }
                        : item
                );
            } else {
                updatedState = [...state, action.item];
            }
            sessionStorage.setItem(`cart_${action.userId}`, JSON.stringify(updatedState));
            return updatedState;


        case "Remove":
            updatedState = state.filter(item => item._id !== action.payload);
            sessionStorage.setItem(`cart_${action.userId}`, JSON.stringify(updatedState));
            return updatedState;

        case "Increase":
            updatedState = state.map(item => 
                item._id === action.payload
                ? { ...item, cartUsage: Math.min(item.cartUsage + 1, item.itemStock) }
                : item
            );
            sessionStorage.setItem(`cart_${action.userId}`, JSON.stringify(updatedState));
            return updatedState;

        case "Decrease":
            updatedState = state.map(item => 
                item._id === action.payload && item.cartUsage > 1
                ? { ...item, cartUsage: item.cartUsage - 1 }
                : item
            );
            sessionStorage.setItem(`cart_${action.userId}`, JSON.stringify(updatedState));
            return updatedState;

        default:
            return state;
    }

}

export const loadCartFromSessionStorage = (userId) => {
    if (!userId) return [];
    const savedCart = JSON.parse(sessionStorage.getItem(`cart_${userId}`));
    return savedCart || [];
};



export default CartReducer;