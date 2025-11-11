import axios from 'axios';
const VITE_INSERT_ORDER_API = import.meta.env.VITE_INSERT_ORDER_API;

export async function insertOrder(customerName, items, grandTotal) {
    const order_details = items.map((item) => (
        {
            'product_id': item.productId,
            'quantity': item.quantity,
            'total_price': item.total
        }
    ))

    try {
        const { data } = await axios.post(`${VITE_INSERT_ORDER_API}`, {
            'customer_name': customerName,
            'grand_total': grandTotal,
            'order_details': order_details
        })
        return data;

    } catch (err) {
        throw err;

    }
}
