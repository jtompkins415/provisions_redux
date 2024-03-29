//Handles Main Application Routing

import {Routes, Route} from 'react-router-dom';
import Home from '../Home/Home';
import LoginForm from '../LoginForm/LoginForm';
import SignupForm from '../SignupForm/SignupForm';
import AccountPage from '../AccountPage/AccountPage';
import AboutPage from '../AboutPage/AboutPage';
import ShopPage from '../Shop/ShopPage';
import ShoppingCart from '../ShoppingCart/ShoppingCart';

function AppRouting({login, signup, currentUser, cart}){
    return (
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<LoginForm login={login} />} />
            <Route exact path='/signup' element={<SignupForm signup={signup}/>} />
            {currentUser && (
                <Route exact path={`/account/${currentUser.username}`} element={<AccountPage currentUser={currentUser} />} />
            )}
            <Route exact path='/about' element={<AboutPage />}/>
            <Route exact path='/shop' element={<ShopPage cart={cart}/>} />
            <Route exact path='/shop/cart' element={<ShoppingCart cart={cart} />} /> 
        </Routes>
    );
}

export default AppRouting;