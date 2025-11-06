import axios from 'axios';
const ADD_PROD_API = import.meta.env.VITE_ADD_PRODUCT_API;


export async function insertProduct(prodName, uomId, price) {
    try {
        const { data } = await axios.post(`${ADD_PROD_API}`, {
            'product_name': prodName,
            'uom_id': uomId,
            'price_per_unit': price
        })
        return data; // Returns the new product id
    } catch (err) {
        throw err;
    }
}