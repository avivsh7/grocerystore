import axios from 'axios';
import { useState, useEffect } from 'react';
import { getProducts } from '../Services/getProducts.js';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();

    }, [])

    async function fetchProducts() {
        const data = await getProducts();
        try {
            setProducts(data);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <h1>Product Management Page</h1>
            <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product =>
                        <tr key={product.product_id}>
                            <td>{product.name}</td>
                            <td>{product.price_per_unit}</td>
                            <td> {product.uom_id === 1 ? 'Unit' : product.uom_id === 2 ? 'Kg' : ''}</td>
                        </tr>)}

                </tbody>
            </table>
        </>
    );
};

export default ProductManagement;
