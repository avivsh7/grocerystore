
const NewOrder = () => {
  return (
    <>
      <div className="containerDiv">
        <span style={{ fontSize: '1.3rem' }}>New Order</span> <input placeholder="Customer Name" className="customerNameInput" type="text" />
        <div className="divider"></div>

        <table className="borderlessTable">
          <thead>
            <tr>
              <th>Date</th>
              <th>Order Number</th>
              <th>Customer Name</th>
              <th>Total Cost</th>
            </tr>
          </thead>
          <tbody>
            {/* tds */}
          </tbody>
        </table>
      </div>
      <div className="totalDiv">
        Total: &nbsp; &nbsp; <input className="totalInput" value={'0.0'} type="text" /> &nbsp; ILS
        <button className="saveBtn" >Save</button>

      </div>
    </>
  )
}

export default NewOrder
