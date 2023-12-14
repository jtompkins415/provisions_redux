import {useState} from 'react';
import { Button, ButtonGroup } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import ShopItem from './ShopItem';


function Shop({foods, beers, wines}){
    const [selectedCategory, setSelectedCategory] = useState('');
    
    const renderItems = (items, category) => {
        return items.map((item, index) => (
            <ShopItem key={`${category}-${index}`} item={item} category={category} />
        ))
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
                return [...renderItems(foods, 'foods'), ...renderItems(beers, 'beers'), ...renderItems(wines, 'wines')];
        }
    };


    return (
        <div id='shop-main-container'>
            <div id='shop-nav-container'>
                <ButtonGroup variant='text' aria-label='text button group'>
                    <Button onClick={() => handleCategoryChange('all')}>All</Button>
                    <Button onClick={() => handleCategoryChange('foods')}>Food</Button>
                    <Button onClick={() => handleCategoryChange('beers')}>Beer</Button>
                    <Button onClick={() => handleCategoryChange('wines')}>Wine</Button>
                </ButtonGroup>
            </div>
            <div id='shop-items-container'>
                {filterItemsByCategory()}
            </div>
        </div>
    )
}

export default Shop;