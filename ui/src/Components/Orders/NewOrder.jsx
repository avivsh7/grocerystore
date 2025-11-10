import { useState, useEffect } from "react";
import { getProducts } from "../../Services/Product/getProducts";

const NewOrder = () => {
  const [customerName, setCustomerName] = useState("");
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [itemId, setItemId] = useState(1)

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

  // Creates an empty object when clicking 'Add More', with a unique Id
  const handleAddItem = () => {
    const newItem = {
      id: itemId,
      productName: '',
      price: '0.00',
      quantity: '1',
      total: '0.00',
    };

    setItems(items => [...items, newItem]);
    setItemId(itemId => itemId + 1);
  };

  // Populating item object
  const handleProductChange = (e, itemId) => {
    const selectedProductName = e.target.value;

    // Get product data from products
    const selectedProduct = products.find(product => product.name === selectedProductName);


    // Product selection update
    setItems(items => items.map(item => {
      if (item.id === itemId) {
        const quantity = parseFloat(item.quantity)
        const itemPrice = parseFloat(selectedProduct.price_per_unit)
        const Total = (quantity * itemPrice).toFixed(2);

        return {
          ...item,
          productName: selectedProductName,
          price: selectedProduct.price_per_unit,
          total: Total,
        };
      }
      return item;
    }));
  };


  const handleQuantityChange = (e, itemId) => {
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

  const orderTotal = items.reduce((sum, item) => sum + (parseFloat(item.total) || 0), 0).toFixed(2);


  return (
    <>
      <div className="containerDiv">
        <p className="newOrderHeader">New Order</p>
        <input
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Customer Name"
          className="customerNameInput"
          type="text"
          value={customerName}
        />
        <div className="divider"></div>

        <table className="borderlessTable">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>
                <button onClick={handleAddItem} className="addMoreBtn">Add More</button>
              </th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>

      <div style={{ margin: '10px' }}>
        {items.map(item => (
          <div key={item.id} className="orderItemDiv">

            {/* Product Selection */}
            <select
              className="itemSelect"
              value={item.productName}
              onChange={(e) => handleProductChange(e, item.id)}
            >
              <option>- Select -</option>
              {products.map((product) => (
                <option key={product.product_id} value={product.name}>
                  {product.name}
                </option>
              ))}
            </select>

            {/* Price Input */}
            <input
              className="itemInput"
              type="number"
              value={item.price}
              readOnly
            />

            {/* Quantity input */}
            <input
              className="itemInput"
              type="number"
              value={item.quantity}
              onChange={(e) => handleQuantityChange(e, item.id)} // Pass item.id
            />

            {/* Total Input */}
            <input
              type="text"
              value={item.total}
              readOnly
            />

          </div>
        ))}
      </div>

      <div className="totalDiv">
        Total: &nbsp; &nbsp; <input className="totalInput" value={orderTotal} type="text" readOnly /> &nbsp; ILS
        <button className="saveBtn">Save</button>
      </div>
    </>
  )
}

export default NewOrder;