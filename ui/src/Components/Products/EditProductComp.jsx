import { useState, useEffect } from "react";
import { updateProduct } from "../../Services/Product/editProduct.js";
import { getUoms } from "../../Services/Uom/getUoms.js"


const EditProductComp = ({ fetchProducts, setShowEditProdUi, showEditProdUi, product }) => {

    const [prodName, setprodName] = useState(product.name);
    const [uoms, setUoms] = useState([]);
    const [uomId, setUomId] = useState(product.uom_id);
    const [price, setPrice] = useState(product.price_per_unit);
    const prodId = product.product_id;

    useEffect(() => {
        fetchUoms();
    }, [])

    async function fetchUoms() {
        try {
            const data = await getUoms()
            setUoms(data);
        } catch (err) {
            console.error(err.response);
        }
    }

    async function handleEdit() {
        if (prodName.length > 45) {
            alert('Product name cannot exceed 45 characters!')
            return;
        }
        try {
            const response = await updateProduct(prodName, price, uomId, prodId);
            setShowEditProdUi(false);
            alert('Product with ID: ' + product.product_id + " Updated Successfully")
            fetchProducts();
        } catch (err) {
            alert('Failed to edit product.')
            console.error(err);
        }
    }

    return (
        <>
            {showEditProdUi &&
                <div className="popUpDiv">
                    <h3>Edit a product!</h3>
                    Product name: <br /> <input className="addEditProdInput" onChange={(e) => setprodName(e.target.value)} type="text" value={prodName} /> <br />
                    Unit: <br /> <select className="addEditProdSelect" value={uomId} onChange={(e) => setUomId(e.target.value)} >
                        {uoms.map((uom) => (
                            <option value={uom.uom_id} key={uom.uom_id}>{uom.uom_name}</option>
                        ))}

                    </select>
                    <br />
                    Price: <br /> <input className="addEditProdInput" onChange={(e) => setPrice(e.target.value)} value={price} type="number" /> <br />
                    <div className="addEditbuttonsContainer">
                        <button onClick={() => handleEdit()} className="saveBtn">Save</button>
                        <button onClick={() => setShowEditProdUi(false)} className="cancelBtn">Cancel</button>
                    </div>
                </div>
            }

        </>
    )
}

export default EditProductComp
