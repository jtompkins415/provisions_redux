//Handles Main Application Routing

import {Routes, Route} from 'react-router-dom';
import Home from '../Home/Home';
import LoginForm from '../LoginForm/LoginForm';

function AppRouting(){
    return (
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<LoginForm />} />
        </Routes>
    );
}

export default AppRouting;