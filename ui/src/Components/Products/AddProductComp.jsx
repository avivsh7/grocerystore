import { useState, useEffect } from 'react'
import { insertProduct } from '../../Services/Product/addProduct.js';
import { getUoms } from '../../Services/Uom/getUoms.js';


const AddProductComp = ({ fetchProducts, showAddProdUi, setShowAddProdUi }) => {
    const [uoms, setUoms] = useState([]);
    const [uomId, setUomId] = useState('');
    const [prodName, setProdName] = useState('');
    const [price, setPrice] = useState('');


    useEffect(() => {
        fetchUoms();
    }, [])

    async function addProduct() {
        if (prodName.length > 45) {
            alert('Product name cannot exceed 45 characters!')
            return;
        }
        else if (uomId === '') {
            alert('Please provide a unit of measurement!')
            return;
        }
        try {
            const response = await insertProduct(prodName, uomId, price);
            alert("Product " + prodName + " added successfully!");
            setShowAddProdUi(false);
            fetchProducts();
        } catch (err) {
            console.error(err.response);
        }
    }

    async function fetchUoms() {
        try {
            const data = await getUoms()
            setUoms(data);
        } catch (err) {
            console.error(err.response);
        }
    }
    
    return (
        <>
            {showAddProdUi &&
                <div className="popUpDiv">
                    <h3>Add a new product!</h3>
                    Product name: <br /> <input className="addEditProdInput" placeholder="Name" onChange={(e) => setProdName(e.target.value)} type="text" /> <br />
                    Unit: <br /> <select className="addEditProdSelect" onChange={(e) => setUomId(e.target.value)}>
                        <option> - Select -</option>
                        {uoms.map(uom =>
                            <option key={uom.uom_id} value={uom.uom_id}>{uom.uom_name}</option>
                        )}
                    </select>
                    <br />
                    Price: <br /> <input className="addEditProdInput" placeholder="Price Per Unit" onChange={(e) => setPrice(e.target.value)} type="number" /> <br />
                    <div className="addEditbuttonsContainer">
                    <button onClick={() => addProduct()} className="saveBtn">Save</button>
                    <button className="cancelBtn" onClick={() => {
                        setShowAddProdUi(false);
                    }}>Cancel</button>
                    </div>
                </div>
            }
        </>
    )
}

export default AddProductComp
