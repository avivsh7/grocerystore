import axios from 'axios'
const EDIT_PRODUCT_API = import.meta.env.VITE_EDIT_PRODUCT_API


export async function updateProduct(prodName, price, uomId, prodId) {
    try {
        const { data } = await axios.put(`${EDIT_PRODUCT_API}`, {
            'name': prodName,
            'price_per_unit': price,
            'uom_id': uomId,
            'product_id': prodId
        })
        return data;
    } catch (err) {
        throw err;
    }
}