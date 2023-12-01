//Handles Main Application Routing

import {Routes, Route} from 'react-router-dom';
import Home from '../Home/Home';
import LoginForm from '../LoginForm/LoginForm';
import SignupForm from '../SignupForm/SignupForm';

function AppRouting({login, signup}){
    return (
        <Routes>
            <Route exact path='/home' element={<Home />} />
            <Route exact path='/login' element={<LoginForm login={login} />} />
            <Route exact path='/signup' element={<SignupForm signup={signup}/>} />
        </Routes>
    );
}

export default AppRouting;