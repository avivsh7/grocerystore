import { Route, Routes } from 'react-router-dom'
import ProductManagement from './Components/ProductManagement'
import NavBar from './Components/NavBar'

function App() {

  return (
    <>
    <NavBar />
   <Routes>
    <Route path='/productManagement' element={<ProductManagement />}></Route>
   </Routes>
   </>
  )
}

export default App
