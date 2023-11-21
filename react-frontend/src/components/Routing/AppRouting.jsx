//Handles Main Application Routing

import {Routes, Route} from 'react-router-dom';
import Home from '../Home/Home';
import Users from '../Users/User';

function AppRouting(){
    return (
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/users' element={<Users/>} />
        </Routes>
    );
}

export default AppRouting;