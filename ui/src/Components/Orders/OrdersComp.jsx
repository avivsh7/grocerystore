import { useNavigate } from "react-router-dom"
import { getOrders } from "../../Services/Order/getOrders";
import { useState, useEffect } from "react";


const OrdersComp = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);


    async function fetchOrders() {
        try {
            const data = await getOrders();
            setOrders(data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, [])

    const ordersTotal = orders.reduce((sum, order) => sum + (parseFloat(order.total)), 0).toFixed(2);


    // Removes timezone declaration from date string.
    function formatDate(datetime) {
        if (!datetime) return '';
        const date = new Date(datetime);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    return (
        <div className="orders-table-container">
            <h2>Grocery Store Management System</h2>
            <div className="divider"></div>
            <div>
                <button onClick={() => navigate('/orders/newOrder')} className="addOrderBtn">New Order</button>
                <button onClick={() => navigate('/productManagement')} className="prod-mng-btn">Product Management</button>
                <br />
                <span style={{ fontSize: '1.2rem' }}>Orders Total:</span> <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{ordersTotal} ILS</span>
                <br /> <br />
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Order Number</th>
                            <th>Customer Name</th>
                            <th>Total Cost</th>
                            <th>Order Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.order_id}>
                                <td>{formatDate(order.datetime)}</td>
                                <td>{order.order_id}</td>
                                <td>{order.customer_name}</td>
                                <td>{order.total} ILS</td>
                                <td>
                                    <button onClick={() => navigate(`/orders/orderDetails/${order.order_id}`)}>View Order</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OrdersComp
