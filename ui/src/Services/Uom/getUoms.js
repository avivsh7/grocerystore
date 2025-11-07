import axios from 'axios';
const GET_UOMS_API = import.meta.env.VITE_GET_UOMS_API;


export async function getUoms() {

    try {
        const { data } = await axios.get(`${GET_UOMS_API}`);
        return data;

    } catch (err) {
        throw err;
    }
}
