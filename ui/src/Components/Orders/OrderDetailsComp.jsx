import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
const VITE_GET_ORDER_SUMMARY_API = import.meta.env.VITE_GET_ORDER_SUMMARY_API;


const OrderDetailsComp = () => {
    const [orderSummary, setOrderSummary] = useState([]);
    const { orderId } = useParams();


    function formatDate(date) {
        if (!date) return '';
        const dateObj = new Date(date);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return new Intl.DateTimeFormat('en-US', options).format(dateObj);
    };

    async function getOrderSummary(orderId) {
        try {
            const { data } = await axios.get(`${VITE_GET_ORDER_SUMMARY_API}`, { params: { order_id: orderId } })
            setOrderSummary(data);
            return data;
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getOrderSummary(orderId)
    }, [])

    const orderTotal = orderSummary.length > 0 ? orderSummary[0].order_total : ''
    const date = orderSummary.length > 0 ? orderSummary[0].datetime : '';
    const formattedDate = formatDate(date);

    return (
        <div className="order-details-container">
            <header style={{ borderBottom: '2px solid #eeeeee', paddingBottom: '20px', marginBottom: '20px' }}>
                <h1 style={{ fontSize: '2.5rem', margin: '0 0 10px 0', color: '#333333' }}>Order Details</h1>
                <div style={{ fontSize: '1.1rem', color: '#555555' }}>
                    Order #
                    <span style={{ fontWeight: 'bold', color: '#000000' }}>
                        {orderSummary.length > 0 ? orderSummary[0].order_id : ''}
                    </span> was placed on
                    <span style={{ fontWeight: 'bold', marginLeft: '5px', color: '#000000' }}>{formattedDate}</span>
                    &nbsp;and is currently  <span style={{ fontWeight: 'bold' }}>Proccessing.</span>
                </div>
            </header>

            <table className="order-details-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Item Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {orderSummary.map((order, index) => (
                        <tr key={order.name}>
                            <td>{order.name}</td>
                            <td>{order.quantity}</td>
                            <td>{order.item_total_price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="dashed-seperator-line">
                <span style={{ color: '#333333' }}>Order Total: </span>
                <span style={{ fontWeight: 'bold', color: '#000000', marginLeft: '10px' }}>
                    {orderTotal} ILS
                </span>
            </div>
        </div>
    )
}

export default OrderDetailsComp