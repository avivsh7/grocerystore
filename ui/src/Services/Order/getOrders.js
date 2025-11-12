import axios from "axios"
const VITE_GET_ALL_ORDERS_API = import.meta.env.VITE_GET_ALL_ORDERS_API;

export async function getOrders() {
    try {
        const { data } = await axios.get(`${VITE_GET_ALL_ORDERS_API}`)
        return data;

    } catch (err) {
        throw err;
    }
}