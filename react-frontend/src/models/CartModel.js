// Shopping Cart Model to Handle cart logic and state
import useLocalStorage from "../hooks/useLocalStorage";

const CartModel = () => {
    const [currentCart, setCurrentCart] = useLocalStorage('shoppingCart',[]);

    //CART METHODS

    const addItemToCart = (item) => {
        setCurrentCart([...currentCart, item]);
    };

    const removeItemFromCart = (itemId) => {
        currentCart.filter(item => item.id !== itemId);
    }

    const clearCart = () => {
        setCurrentCart([]);
    }

    const getCartTotal = () => {
        return currentCart.reduce((total, item) => {
        return total + item.price;
        }, 0);
    }

    return {
        currentCart,
        addItemToCart,
        removeItemFromCart,
        clearCart,
        getCartTotal
    };
};

export default CartModel;