//Handles Main Application Routing

import {Routes, Route} from 'react-router-dom';
import Home from '../Home/Home';
import LoginForm from '../LoginForm/LoginForm';
import SignupForm from '../SignupForm/SignupForm';
import AccountPage from '../AccountPage/AccountPage';
import AboutPage from '../AboutPage/AboutPage';

function AppRouting({login, signup, currentUser}){
    return (
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<LoginForm login={login} />} />
            <Route exact path='/signup' element={<SignupForm signup={signup}/>} />
            {currentUser && (
                <Route exact path={`/account/${currentUser.username}`} element={<AccountPage currentUser={currentUser} />} />
            )}
            <Route exact path='/about' element={<AboutPage />}/>
        </Routes>
    );
}

export default AppRouting;