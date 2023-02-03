import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Main from "./layouts/Main/Main";
import Shop from "./component/Shop/Shop";
import Inventory from "./component/Inventory/Inventory";
import OrderProduct from "./component/OrderProduct/OrderProduct";
import About from "./component/About/About";
import { ProductAndCartLoader } from "./component/ProductAndCartLoader/ProductAndCartLoader";
import Login from "./component/Login/Login";
import Signup from "./component/Signup/Signup";
import Shipping from "./component/Shipping/Shipping";
import PrivateRoute from "./component/Routes/PrivateRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: "/",
          loader: () => fetch("products.json"),
          element: <Shop></Shop>,
        },
        { path: "/inventory", element: <Inventory></Inventory> },
        {
          path: "/shipping",
          element: (
            <PrivateRoute>
              <Shipping></Shipping>
            </PrivateRoute>
          ),
        },
        {
          path: "/login",
          element: <Login></Login>,
        },
        {
          path: "/signup",
          element: <Signup></Signup>,
        },
        {
          path: "/orders",
          loader: ProductAndCartLoader,
          element: <OrderProduct></OrderProduct>,
        },
        { path: "/about", element: <About></About> },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
