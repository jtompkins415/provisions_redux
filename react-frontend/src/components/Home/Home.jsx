//Landing Page Component
import {Button} from '@mui/material';
import './Home.css';
function Home(){
    
    return (
        <>
            <div className="home-title-container">
                <h1 id="home-title">Provisons</h1>
                <h2 id="home-subtitle">Artisinal Foods, Craft Beers, & Natural Wines</h2>
            </div>

            <div className="home-shop-button-container">
                <Button variant="contained" href='/shop'>Shop Now</Button>
            </div>
        </>
    );
}

export default Home;