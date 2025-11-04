import axios from 'axios';

export async function getProducts() {
    const { data } = await axios.get('http://127.0.0.1:5000/getProducts');
    try {
    return data;

    } catch (err) {
        return err;
    }
}
