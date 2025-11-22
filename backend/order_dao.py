from datetime import datetime

from sql_connection import get_sql_connection

connection = get_sql_connection()

def insert_order(connection, order):
    cursor = connection.cursor()

    order_query = ("INSERT INTO orders "
                   "(customer_name, total, datetime)"
                   "VALUES (%s, %s, %s)")
    order_data = (order['customer_name'], order['grand_total'], datetime.now())

    cursor.execute(order_query, order_data)
    order_id = cursor.lastrowid

    order_details_query = ("INSERT INTO order_details "
                           "(order_id, product_id, quantity, total_price)"
                           "VALUES (%s, %s, %s, %s)")

    order_details_data = []
    for order_detail_record in order['order_details']:
        order_details_data.append([
            order_id,
            int(order_detail_record['product_id']),
            float(order_detail_record['quantity']),
            float(order_detail_record['total_price'])
        ])
    cursor.executemany(order_details_query, order_details_data)

    connection.commit()

    return order_id

def get_all_orders(connection):
    cursor = connection.cursor()
    query = ("SELECT * from orders")
    cursor.execute(query)

    response = []
    for (order_id, customer_name, total, datetime) in cursor:
        response.append({
            'order_id': order_id,
            'customer_name': customer_name,
            'total': total,
            'datetime': datetime
        })
    return response


def get_order_details(connection, order_id):
    cursor = connection.cursor(dictionary=True)
    query = ("SELECT * from order_details WHERE order_id =" +str(order_id))
    cursor.execute(query)
    order_details = cursor.fetchall()
    connection.commit()
    return order_details

def get_order_summary(connection, order_id):
    cursor = connection.cursor(dictionary=True)
    query = ("SELECT o.order_id, o.customer_name, o.total AS order_total, "
            "DATE_FORMAT(o.datetime, '%Y-%m-%d %H:%i:%s') AS datetime, "
            "p.name, od.quantity, od.total_price AS item_total_price "
            "FROM order_details AS od join "
            "products AS p ON od.product_id = p.product_id "
            "join orders AS o ON od.order_id = o.order_id "
            "WHERE o.order_id =" +str(order_id))
    cursor.execute(query)
    order_info = cursor.fetchall()
    connection.commit()
    return order_info

