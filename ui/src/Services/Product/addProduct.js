import axios from 'axios';
const INSERT_PROD_API = import.meta.env.VITE_INSERT_PRODUCT_API;


export async function insertProduct(prodName, uomId, price) {
    try {
        const { data } = await axios.post(`${INSERT_PROD_API}`, {
            'product_name': prodName,
            'uom_id': uomId,
            'price_per_unit': price
        })
        return data;
    } catch (err) {
        throw err;
    }
}