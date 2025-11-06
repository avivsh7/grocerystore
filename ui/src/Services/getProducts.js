import axios from 'axios';
const GET_PRODUCTS_API = import.meta.env.VITE_GET_PRODUCTS_API;

export async function getProducts() {

    try {
        const { data } = await axios.get(`${GET_PRODUCTS_API}`);
        return data;

    } catch (err) {
        throw err;
    }
}
