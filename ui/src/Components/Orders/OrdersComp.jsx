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

    
    return (
        <div className="containerDiv">
            <h2>Grocery Store Management System</h2>
            <div className="divider"></div>
            <div>
                <button onClick={() => navigate('/orders/newOrder')} className="addOrderBtn">New Order</button>
                <button onClick={() => navigate('/productManagement')} className="prodMngBtn">Product Management</button>

                <table className="ordersTable">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Order Number</th>
                            <th>Customer Name</th>
                            <th>Total Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.order_id}>
                                <td>{order.datetime}</td>
                                <td>{order.order_id}</td>
                                <td>{order.customer_name}</td>
                                <td>{order.total} ILS</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OrdersComp
