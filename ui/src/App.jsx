import { Route, Routes } from 'react-router-dom'
import ProductManagement from './Components/Products/ProductManagement'
import NavBar from './Components/NavBar'
import OrdersComp from './Components/Orders/OrdersComp'
import NewOrder from './Components/Orders/NewOrder'
import OrderDetailsComp from './Components/Orders/OrderDetailsComp'
import IndexPage from './Components/IndexPage'

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<IndexPage />} />
        <Route path='/productManagement' element={<ProductManagement />} />
        <Route path='/orders' element={<OrdersComp />} />
        <Route path='/orders/newOrder' element={<NewOrder />} />
        <Route path='/orders/orderDetails/:orderId' element={<OrderDetailsComp />} />
      </Routes>
    </>
  )
}

export default App
