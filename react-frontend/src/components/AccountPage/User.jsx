import {useState, useEffect} from 'react';
import ProvisionsReduxApi from '../../api/provisions-redux-api';
import Orders from '../Orders/Orders';
import './User.css';

function User({currentUser}) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrderData = async () => {
        const results = await ProvisionsReduxApi.getOrdersByUser(currentUser.id);
        setOrders(results);
    }
        getOrderData()
    },[currentUser.id])


    return (
        <div id="user-main-container">
            <div id="user-title-container">
                <span id="user-username">{currentUser.username}</span>
                <span id="user-email">{currentUser.email}</span>
            </div>
            <div id="user-detail-container">
                <span><b>First Name:</b> {currentUser.first_name}</span>
                <span><b>Last Name:</b> {currentUser.last_name}</span>
                <span><b>City:</b> {currentUser.city}</span>
                <span><b>State:</b> {currentUser.state}</span>
            </div>
            <div id="user-orders-container">
                <Orders orders={orders} />
            </div>
        </div>
    )
}

export default User;