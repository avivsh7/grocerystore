import { useState, useEffect } from "react";
import { getProducts } from "../../Services/Product/getProducts";
import { insertOrder } from "../../Services/Order/InsertOrder"
import { useNavigate } from "react-router-dom";


const NewOrder = () => {
    const [customerName, setCustomerName] = useState('');
    const [items, setItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [itemId, setItemId] = useState(1);

    const redirect = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (err) {
            console.error(err.response);
        }
    }

    async function addOrder(customerName, items, grandTotal) {
        if (customerName === '') {
            alert('Customer name is needed to send an order!')
            return;
        }

        for (const item of items) {
            if (item.total === '0.00') {
                alert("Cannot submit an order with an empty item slot! Please remove the empty slot and try again.")
                return
            }
        }

        try {
            const response = await insertOrder(customerName, items, grandTotal);
            alert('Order received successfully!')
            redirect('/');
        } catch (err) {
            alert('Order submission failed, please check console and server logs.')
            console.error(err);
        }
    }

    function removeItem(itemId) {
        const newItems = items.filter(item => item.id !== itemId)
        setItems(newItems)
    }

    // Creates an empty object when clicking 'Add Item', with a unique ID
    // itemId = client-side item, productId = DB product listing ID
    function addItem() {
        const newItem = {
            id: itemId,
            productId: '',
            productName: '',
            price: '0.00',
            quantity: '1',
            total: '0.00',
        };

        setItems(items => [...items, newItem]);
        setItemId(itemId => itemId + 1);
    };

    // Product selection update 
    function handleProductChange(e, itemId) {
        const selectedProductName = e.target.value;

        // Get product data from products
        const selectedProduct = products.find(product => product.name === selectedProductName);

        // Handle case where select value is falsy (picking '- Select -')
        if (!selectedProduct) {
            setItems(items => items.map(item => {
                if (item.id === itemId) {
                    return {
                        ...item,
                        productId: '',
                        productName: '',
                        price: '0.00',
                        total: '0.00',
                    };
                }
                return item;
            }));
            return;
        }

        // Populating item object
        setItems(items => items.map(item => {
            if (item.id === itemId) {
                const quantity = parseFloat(item.quantity);
                const itemPrice = parseFloat(selectedProduct.price_per_unit);
                const Total = (quantity * itemPrice).toFixed(2);

                return {
                    ...item,
                    productId: selectedProduct.product_id,
                    productName: selectedProductName,
                    price: selectedProduct.price_per_unit,
                    total: Total,
                };
            }
            return item;
        }));
    };


    function handleQuantityChange(e, itemId) {
        const newQuantity = e.target.value;

        setItems(items => items.map(item => {
            if (item.id === itemId) {
                const quantity = parseFloat(newQuantity)
                const itemPrice = parseFloat(item.price)
                const newTotal = (quantity * itemPrice).toFixed(2);

                return {
                    ...item,
                    quantity: newQuantity,
                    total: newTotal,
                };
            }
            return item;
        }));
    };

    const grandTotal = items.reduce((sum, item) => sum + (parseFloat(item.total)), 0).toFixed(2);


    // Creates an array of items that has a populated productId field, meaning they are currently selected and in items arr
    // When no product has been picked default of productId is '' = falsy
    const selectedProductIds = items
        .filter(item => item.productId)
        .map(item => item.productId);

    return (
        <>
            <div className="container-div">
                <p className="new-order-header">New Order</p>
                <input
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Customer Name"
                    className="customer-name-input"
                    type="text"
                />
                <div className="divider"></div>

                <table className="borderless-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>
                                <button onClick={addItem} className="add-item-btn">Add Item</button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>

            <div style={{ margin: '10px' }}>
                {items.map(item => {
                    // 2. Get the productId for the current line
                    const currentProductId = item.productId;

                    // 3. Filtering the options list for the dropdown
                    const availableProducts = products.filter(product =>
                        // A product is available if its ID is NOT in the selected list
                        // OR if it the product currently selected in THIS line
                        !selectedProductIds.includes(product.product_id) || product.product_id === currentProductId
                    );

                    return (
                        <div key={item.id} className="order-item-div">

                            {/* Product Selection */}
                            <select
                                className="item-select"
                                value={item.productName}
                                onChange={(e) => handleProductChange(e, item.id)}
                            >
                                <option value="">- Select -</option>
                                {availableProducts.map((product) => (
                                    <option key={product.product_id} value={product.name}>
                                        {product.name}
                                    </option>
                                ))}
                            </select>

                            {/* Price Input */}
                            <input
                                className="item-input"
                                type="number"
                                value={item.price}
                                readOnly
                            />

                            {/* Quantity input */}
                            <input
                                className="item-input"
                                type="number"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(e, item.id)}
                            />

                            {/* Total Input */}
                            <input className="item-total-input" style={{ marginRight: '60px ' }}
                                type="text"
                                value={item.total}
                                readOnly
                            />
                            <button className="remove-btn" onClick={() => removeItem(item.id)}>Remove</button>
                        </div>
                    )
                })}


            </div>

            <div className="total-div">
                Total: &nbsp; &nbsp; <input className="items-total-input" value={grandTotal} type="text" readOnly /> &nbsp; ILS
                <button onClick={() => addOrder(customerName, items, grandTotal)} className="save-btn">Save</button>
            </div>
        </>
    )
}

export default NewOrder;