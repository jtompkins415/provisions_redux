import './Orders.css';

function Orders({orders}){

    if (!orders || orders.length === 0) {
        return (
            <div id="orders-main-container">
                <div id="order-title-container">
                    <h2 id="order-title">Order History</h2>
                </div>
                <div id="order-details-container">
                    <p className='order-detail'>No orders available.</p>
                </div>
            </div>
        );
    }

    const orderElements = orders.map((order) => (
        <div key={order.id} className="order-details-container">
        {/* Render order details here */}
        <p className='order-detail'>Order ID: {order.id}</p>
        <p className='order-detail'>Total Price: ${order.total_price}</p>
        <p className='order-detail'>Order Date: {order.order_date}</p>
    </div>
    ))

    return (
        <div id="orders-main-container">
            <div id="order-title-container">
                <h2 id="order-title">Order History</h2>
            </div>
            <div id="order-details-container">
                {orderElements}
            </div>
        </div>
       
    )
}

export default Orders;