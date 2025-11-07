import axios from 'axios';
const DELETE_PROD_API = import.meta.env.VITE_DELETE_PRODUCT_API;

export async function deleteProd(prodId) {
    try {
        const { data } = await axios.delete(`${DELETE_PROD_API}`, { data: { product_id: prodId } });
        return data;
    } catch (err) {
        throw err;
    }
}