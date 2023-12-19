import { Button } from "@mui/material";
import './ShoppingCart.css';


function ShoppingCart({cart}){
    const {currentCart,clearCart, removeItemFromCart, getCartTotal} = cart
    const cartItems = currentCart;
    
    console.log(currentCart);
    return (
        <div id="shoppingCart-main-container">
            <div id="shoppingCart-cart-container">
                <div id="shoppingCart-cartTitle-container">
                    <h3>Your Order</h3>
                </div>
                <div id="shoppingCart-cartDetails-container">
                    {cartItems.map((cartItem) => (
                        <>
                            <p key={cartItem.id} className="cartItem-details">{cartItem.name} - ${cartItem.price}</p>
                            <Button onClick={() => removeItemFromCart(cartItem.id)} id="cartItem-removeButton">X</Button>
                        </>
                    ))}

                </div>  
                <div id="shoppingCart-total-container">
                    <p id="shoppingCart-total">Total: ${getCartTotal()} </p>
                </div>  
                <div id="shoppingCart-clearButton-container">
                    <Button onClick={() => clearCart()} id="shopping">Empty Cart</Button>
                </div>
            </div>
            
        </div>
    )

}

export default ShoppingCart