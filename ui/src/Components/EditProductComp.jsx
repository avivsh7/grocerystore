import { useState } from "react";
import axios from 'axios'
import { updateProduct } from "../Services/Product/editProduct.js";

const EditProductComp = ({ fetchProducts, setShowEditProdUi, showEditProdUi, product, setProducts }) => {

    const [prodName, setprodName] = useState(product.name);
    const [uomId, setUomId] = useState(product.uom_id);
    const [price, setPrice] = useState(product.price_per_unit);
    const prodId = product.product_id

    async function handleEdit() {
        try {
            const response = await updateProduct(prodName, price, uomId, prodId);
            setShowEditProdUi(false);
            alert('Product with ID: ' + product.product_id + " Updated Successfully")
            fetchProducts();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            {showEditProdUi &&
                <div className="popUpDiv">
                    <h3>Edit a product!</h3>
                    Product name: <br /> <input onChange={(e) => setprodName(e.target.value)} type="text" value={prodName} /> <br />
                    Unit: <br /> <select onChange={(e) => setUomId(e.target.value)} >
                        <option value={product.uom_id}>{product.uom_name}</option>
                        <option value={product.uom_id === 1 ? 2 : 1}>{(product.uom_name === 'each') ? 'kg' : 'each'}</option>

                    </select>
                    <br />
                    Price: <br /> <input onChange={(e) => setPrice(e.target.value)} value={price} type="number" /> <br />
                    <button onClick={() => handleEdit()} className="saveBtn">Save</button>
                    <button onClick={() => setShowEditProdUi(false)} className="cancelBtn">Cancel</button>

                </div>
            }

        </>
    )
}

export default EditProductComp
