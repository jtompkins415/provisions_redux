//Handles Main Application Routing

import {Routes, Route} from 'react-router-dom';
import Home from '../Home/Home';

function AppRouting(){
    return (
        <Routes>
            <Route exact path='/' element={<Home />} />
        </Routes>
    );
}

export default AppRouting;