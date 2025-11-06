import React, { useRef, useState, useEffect } from 'react'
import { insertProduct } from '../Services/addProduct.js';
import { getUoms } from '../Services/getUoms.js';


const AddProductComp = ({ fetchProducts, showAddProdUi, setShowAddProdUi }) => {
    const [uoms, setUoms] = useState([]);
    const [uomId, setUomId] = useState('1');
    const [prodName, setProdName] = useState('');
    const [price, setPrice] = useState('');


    useEffect(() => {
        fetchUoms();
    }, [])

    async function addProduct() {
        try {
            const response = await insertProduct(prodName, uomId, price);
            alert("Product " + prodName + " added successfully!");
            setShowAddProdUi(false);
            fetchProducts();
        } catch (err) {
            console.error(err.response);
            alert('Product name cannot exceed 45 characters!')
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
                <div className='popUpDiv'>
                    <h3>Add a new product!</h3>
                    Product name: <br /> <input onChange={(e) => setProdName(e.target.value)} type="text" /> <br />
                    Unit: <br /> <select onChange={(e) => setUomId(e.target.value)}>
                        <option> - Select -</option>
                        {uoms.map(uom =>
                            <option key={uom.uom_id} value={uom.uom_id}>{uom.uom_name}</option>
                        )}
                    </select>
                    <br />
                    Price: <br /> <input onChange={(e) => setPrice(e.target.value)} type="number" /> <br />
                    <button onClick={() => addProduct()} className='saveBtn'>Save</button>
                    <button className='cancelBtn' onClick={() => {
                        setShowAddProdUi(false);
                    }}>Cancel</button>
                </div>
            }
        </>
    )
}

export default AddProductComp
