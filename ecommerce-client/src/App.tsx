import { RouterProvider } from 'react-router-dom'
import './App.css'
import { router } from './routes/Router'
import { CartProvider } from './Context/CartContext'

function App() {

  return (
    <>
      <CartProvider>
        <RouterProvider router={router}></RouterProvider>
      </CartProvider>
    </>
  )
}

export default App
