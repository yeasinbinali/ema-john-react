import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Main from './layouts/Main/Main';
import Shop from './component/Shop/Shop'
import Inventory from './component/Inventory/Inventory';
import OrderProduct from './component/OrderProduct/OrderProduct';
import About from './component/About/About';
import { ProductAndCartLoader } from './component/ProductAndCartLoader/ProductAndCartLoader';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      children: [
        {
          path: '/shop',
          loader: () => fetch('products.json'),
          element: <Shop></Shop>
        },
        {path: '/inventory', element: <Inventory></Inventory>},
        {
          path: '/orders', 
          loader: ProductAndCartLoader,
          element: <OrderProduct></OrderProduct>
        },
        {path: '/about', element: <About></About>}
      ]
    }
  ])

  return (
    <div>
      <RouterProvider router = {router}></RouterProvider>
    </div>
  );
}

export default App;
