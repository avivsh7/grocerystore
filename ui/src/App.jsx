import { Route, Routes } from 'react-router-dom'
import ProductManagement from './Components/Products/ProductManagement'
import NavBar from './Components/NavBar'
import OrdersComp from './Components/Orders/OrdersComp'
import NewOrder from './Components/Orders/NewOrder'

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/productManagement' element={<ProductManagement />}></Route>
        <Route path='/orders' element={<OrdersComp />}></Route>
        <Route path='/orders/newOrder' element={<NewOrder />}></Route>
      </Routes>
    </>
  )
}

export default App
