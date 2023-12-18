import { Button } from "@mui/material";


function ShoppingCart({cart}){
    const {currentCart,clearCart} = cart
    const cartItems = currentCart;
    
    console.log(currentCart);
    return (
        <div id="shoppingCart-main-container">
            <div id="shoppingCart-title-container">
                <h2>SHOPPING CART</h2>
            </div>
            <div id="shoppingCart-cart-container">
                <div id="shoppingCart-cartTitle-container">
                    <h3>Your Order</h3>
                </div>
                <div id="shoppingCart-cartDetails-container">
                    {/* {cartItems.map((cartItem) => (
                        <>
                            <p>{cartItem}</p>
                        </>
                    ))} */}
                    <Button onClick={() => clearCart()}>Clear Cart</Button>
                </div>
            </div>
            
        </div>
    )

}

export default ShoppingCart