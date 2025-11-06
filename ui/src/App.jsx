import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import ProductManagement from './Components/ProductManagement'

function App() {
  const [count, setCount] = useState(0)

  return (
   <Routes>
    <Route path='/productManagement' element={<ProductManagement />}></Route>
   </Routes>
  )
}

export default App
