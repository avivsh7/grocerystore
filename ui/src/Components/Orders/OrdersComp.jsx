import { useNavigate } from "react-router-dom"


const OrdersComp = () => {
    const navigate = useNavigate();
    return (
        <div className="containerDiv">
            <h2>Grocery Store Management System</h2>
            <div className="divider"></div>
            <div>
                <button onClick={() => navigate('/orders/newOrder')} className="addOrderBtn">New Order</button>
                <button className="prodMngBtn">Product Management</button>

                <table>
                    <thead>
                        <tr>
                        <th>Date</th>
                        <th>Order Number</th>
                        <th>Customer Name</th>
                        <th>Total Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>09-11-2025</td>
                            <td>62</td>
                            <td>Ironman</td>
                            <td>300</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OrdersComp
