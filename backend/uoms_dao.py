def get_uoms(connection):
    cursor = connection.cursor()

    query = ("SELECT * FROM grocery_store.uom")

    cursor.execute(query)

    response = []

    for (uom_id, uom_name) in cursor:
        response.append(
        {
            'uom_name': uom_name,
            'uom_id': uom_id
        }
    )
    return response