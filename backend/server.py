from flask import Flask, request, jsonify
import products_dao, uoms_dao
import order_dao
from sql_connection import get_sql_connection
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

connection = get_sql_connection()
@app.route('/getProducts', methods=['GET'])
def get_products():
    response = products_dao.get_all_products(connection)
    return jsonify(response)

@app.route('/getAllOrders', methods=['GET'])
def get_orders():
    response = order_dao.get_all_orders(connection)
    return jsonify(response)

@app.route('/getOrderSummary', methods=['GET'])
def get_order_summary():
    order_id = int(request.args.get('order_id'))
    response = order_dao.get_order_summary(connection, order_id)
    return jsonify(response)


@app.route('/editProduct', methods=['PUT'])
def edit_product():
    data = request.get_json()
    response = products_dao.edit_product(connection, data)
    return jsonify(response)


@app.route('/insertOrder', methods=['POST'])
def insert_order():
    data = request.get_json()
    print(data)
    order_id = order_dao.insert_order(connection, data)
    response = {
        'order_id': order_id
    }
    return jsonify(response)




@app.route('/insertProduct', methods=['POST'])
def add_product():
    data = request.get_json()
    product_id = products_dao.insert_new_product(connection, data)
    response = {
        'new_product_id': product_id
    }
    return jsonify(response)


@app.route('/deleteProduct', methods=['DELETE'])
def delete_product():
    data = request.get_json()
    product_id = data['product_id']
    products_dao.delete_product(connection, product_id)
    response = {
        'deleted_product_id': product_id
    }
    return jsonify(response)

@app.route('/getUoms', methods=['GET'])
def get_uoms():
    response = uoms_dao.get_uoms(connection)
    return jsonify(response)

if __name__ == "__main__":
    print("Starting Python Flask Server for Grocery Store Management System")
    app.run(port=5000)