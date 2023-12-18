import {useState} from 'react';
import { Button} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import ShopItem from './ShopItem';
import './Shop.css';


function Shop({foods, beers, wines, cart}){
    console.log(cart.currentCart);
    const [selectedCategory, setSelectedCategory] = useState('');
    const {addItemToCart} = cart;

    const renderItems = (items, category) => {
        return (
            <>
            <div id='category-container'>
                <h3>{category}</h3>
            </div>
            <div id='items-container'>
                {items.map((item, index) => (
                <ShopItem key={`${category}-${index}`} item={item} category={category} addItem={addItemToCart}/>
                ))}
            </div>
            </>
            
           
        );  
    }

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    }

    const filterItemsByCategory = () => {
        if(!foods || !beers || !wines){
            return (
                <CircularProgress />
            )
        }

        switch (selectedCategory){
            case 'foods':
                return renderItems(foods, 'foods')
            case 'beers':
                return renderItems(beers, 'beers');
            case 'wines':
                return renderItems(wines, 'wines');
            default:
                return [].concat(renderItems(foods, 'foods'), renderItems(beers, 'beers'), renderItems(wines, 'wines')) ;
        }
    };


    return (
        <div id='shop-main-container'>
            <div id='shop-nav-container'>
                
                    <Button onClick={() => handleCategoryChange('all')}>All</Button>
                    <Button onClick={() => handleCategoryChange('foods')}>Food</Button>
                    <Button onClick={() => handleCategoryChange('beers')}>Beer</Button>
                    <Button onClick={() => handleCategoryChange('wines')}>Wine</Button>
               
            </div>
            <div id='shop-items-container'>
                {filterItemsByCategory()}
            </div>
        </div>
    )
}

export default Shop;