import {useState, useEffect} from 'react';
import ProvisionsReduxApi from '../../api/provisions-redux-api';
import CircularProgress from '@mui/material/CircularProgress';
import Shop from './Shop';
import './ShopPage.css';

function ShopPage({cart}){
    const [foods, setFoods] = useState([]);
    const [beers, setBeers] = useState([]);
    const [wines, setWines] = useState([]);
    const [shopInfoLoaded, setShopInfoLoaded] = useState(false);

    useEffect(() => {
        const getAllItemsData = async () => {
            try{
                const foodResults = await ProvisionsReduxApi.getAllFoodData();
                const beerResults = await ProvisionsReduxApi.getAllBeerData();
                const wineResults = await ProvisionsReduxApi.getAllWineData();
                    
                setFoods(foodResults || []);
                setBeers(beerResults || []);
                setWines(wineResults || []);
                setShopInfoLoaded(true);
            }catch(err){
                console.error('Error fetching data: ', err);
            }
            
        }
        getAllItemsData()
    }, []);

    if(!shopInfoLoaded){
        return (
            <CircularProgress />
        )
    }

    return (

        <div id='shopPage-main-container'>
            <div id='shopPage-title-container'>
                <h2>THE SHOP</h2>
            </div>
            <div id='shopPage-shop-container'>
                <Shop foods={foods} beers={beers} wines={wines} cart={cart}/>
            </div>
        </div>
    )

}

export default ShopPage;