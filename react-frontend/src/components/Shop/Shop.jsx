import {useState, useEffect} from 'react';
import ProvisionsReduxApi from '../../api/provisions-redux-api';


function Shop(){
    const [food, setFoods] = useState([]);
    const [beers, setBeers] = useState([]);
    const [wines, setWines] = useState([]);
    const [shopInfoLoaded, setShopInfoLoaded] = useState(false);

    useEffect(() => {
        const getAllItemsData = async () => {
            const foodResults = await ProvisionsReduxApi.getAllFoodData();
            const beerResults = await ProvisionsReduxApi.getAllBeerData();
            const wineResults = await ProvisionsReduxApi.getAllWineData();
            
            setFoods(foodResults);
            setBeers(beerResults);
            setWines(wineResults);
            setShopInfoLoaded(true);
        }
        getAllItemsData()
    }, []);



    return (
        <div id='shop-main-container'>
            <div id='shop-title-container'>
                <h2>PROVISIONS SHOP</h2>
            </div>
            <div className='shop-nav-container'>
                
            </div>
        </div>
    )
}

export default Shop;