from flask import Flask, request, jsonify
import products_dao, uoms_dao
from sql_connection import get_sql_connection
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

connection = get_sql_connection()
@app.route('/getProducts', methods=['GET'])
def get_products():
    products = products_dao.get_all_products(connection)
    response = products
    return response

@app.route('/editProduct', methods=['PUT'])
def edit_product():
    data = request.get_json()
    response = products_dao.edit_product(connection, request.get_json())
    return jsonify(response)


@app.route('/addProduct', methods=['POST'])
def add_product():
    product_id = products_dao.insert_new_product(connection, request.get_json())
    response = {
        'new_product_id': product_id
    }
    return response



@app.route('/deleteProduct', methods=['DELETE'])
def delete_product():
    data = request.get_json()
    product_id = data['product_id']
    products_dao.delete_product(connection, product_id)
    response = {
        'deleted_product_id': product_id
    }
    return response

@app.route('/getUoms', methods=['GET'])
def get_uoms():
    uoms = uoms_dao.get_uoms(connection)
    response = uoms
    return response

if __name__ == "__main__":
    print("Starting Python Flask Server for Grocery Store Management System")
    app.run(port=5000)