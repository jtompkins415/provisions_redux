import { Button } from '@mui/material';
import './ShopItem.css';


function ShopItem({item, category, addItem}){

    let itemName, itemBrewery, itemCategory, itemStyle, itemWinery, itemVintage, itemAbv, itemPrice;
    
    switch (category) {
        case 'foods':
            ({ name: itemName, category:itemCategory, price: itemPrice} = item);
            break;
        case 'beers':
            ({ beer_name: itemName, brewery: itemBrewery, beer_style: itemStyle, beer_abv: itemAbv, price: itemPrice} = item);
            break;
        case 'wines':
            ({ wine_name: itemName, winery: itemWinery, wine_style: itemStyle, vintage: itemVintage, abv: itemAbv, price: itemPrice } = item);
            break;
        default:
            // Handle unknown category or add a default case
            return null;
    }


    return (
        <div id="shopitem-main-container">
            <div id="shopitem-details-container">
            <h3>{itemName}</h3>
                {itemBrewery && <p>Brewery: {itemBrewery}</p>}
                {itemWinery && <p>Winery: {itemWinery}</p>}
                {itemCategory && <p>Category: {itemCategory}</p>}
                {itemStyle && <p>Style: {itemStyle}</p>}
                {itemVintage && <p>Vintage: {itemVintage}</p>}
                {itemAbv && <p>ABV: {itemAbv}</p>}
                {itemPrice && <p><b>${itemPrice}</b></p>}
            </div>
            <div id='shopitem-button-container'>
                <Button variant="contained" onClick={() => addItem({id: item.id, name: itemName, price: itemPrice})}>Add to cart</Button>
            </div>
        </div>
    )
}

export default ShopItem;