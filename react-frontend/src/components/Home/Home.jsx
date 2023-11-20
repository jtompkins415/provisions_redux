//Landing Page Component
import {Button} from '@mui/material';
import './Home.css';
function Home(){
    
    return (
        <div id='home-main-container'>
            <div id="home-title-container">
                <h1 id="home-title">Provisons</h1>
                <h2 id="home-subtitle">Artisinal Foods, Craft Beers, & Natural Wines</h2>
            </div>

            <div id="home-shop-button-container">
                <Button id="home-shop-button" variant="contained" href='/shop' >Shop Now</Button>
            </div>
        </div>
    );
}

export default Home;