import { useNavigate } from "react-router-dom";

const IndexPage = () => {
    const redirect = useNavigate();
    
    return (
        <>
            <div className="container-div">
                <div className="index-button-container">
                    <button onClick={() => redirect('/productManagement')} className="index-button">Product Management</button>
                    <button onClick={() => redirect('/orders')} className="index-button">All Orders</button>
                    <button onClick={() => redirect('/orders/newOrder')} className="index-button">New Order</button>
                </div>
            </div>
        </>

    )
}

export default IndexPage
