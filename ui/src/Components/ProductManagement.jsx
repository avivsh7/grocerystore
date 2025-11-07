import axios from 'axios';
import { useState, useEffect } from 'react';
import { getProducts } from '../Services/Product/getProducts.js';
import { deleteProd } from '../Services/Product/deleteProduct.js';
import Overlay from './Overlay.jsx';
import AddProductComp from './AddProductComp.jsx';
import EditProductComp from './EditProductComp.jsx';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({});
    const [showAddProdUi, setShowAddProdUi] = useState(false);
    const [showEditProdUi, setShowEditProdUi] = useState(false);


    useEffect(() => {
        fetchProducts();
    }, [])

    async function fetchProducts() {
        try {
            const data = await getProducts();
            setProducts(data);
            return data;
        } catch (err) {
            console.error(err.response);
        }
    }
    async function deleteProduct(prodId, prodName) {
        const confirmDeletion = window.confirm("Are you sure you want to delete product " + prodName + "?");
        if (!confirmDeletion) {
            return;
        }
        try {
            const response = await deleteProd(prodId, prodName);
            alert("Product " + prodName + " deleted successfully!");
            fetchProducts();
        }
        catch (err) {
            alert("Failed to delete product " + prodName + "!");

        }
    }


    function handleEdit(product) {
        setProduct(product);
        setShowEditProdUi(true);
    }


    return (
        <>
            {(showAddProdUi || showEditProdUi) && <Overlay />} {/* Overlay for AddProductComp.jsx */}
            <div>
                <span>Product Management</span>
                <div style={{ borderTop: '1px solid black', width: '1020px', marginLeft: '-10px', }}></div>
                <button onClick={() => {
                    setShowAddProdUi(true);
                }} className='addProdBtn'>Add A New Product</button>
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Price</th>
                            <th>Type</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product =>
                            <tr key={product.product_id}>
                                <td>{product.name}</td>
                                <td>{product.price_per_unit}</td>
                                <td> {product.uom_name}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <button onClick={() => handleEdit(product)}>Edit</button>
                                    <button onClick={() => deleteProduct(product.product_id, product.name)}
                                        className='deleteBtn'>Delete</button>
                                </td>
                            </tr>)}

                    </tbody>
                </table>
            </div>

            {/* Pop-up div to add a product */}
            {showAddProdUi && <AddProductComp
                fetchProducts={fetchProducts}
                showAddProdUi={setShowAddProdUi}
                setShowAddProdUi={setShowAddProdUi} />
            }

            {/* Pop-up div to edit a product */}
            {showEditProdUi && <EditProductComp
                fetchProducts={fetchProducts}
                showEditProdUi={showEditProdUi}
                setShowEditProdUi={setShowEditProdUi}
                product={product}
            />
            }
        </>
    );
};

export default ProductManagement;
