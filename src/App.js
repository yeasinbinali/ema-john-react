import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Main from "./layouts/Main/Main";
import Shop from "./component/Shop/Shop";
import Login from "./component/Login/Login";
import Signup from "./component/Signup/Signup";
import SingleProductOverview from "./component/SingleProductOverview/SingleProductOverview";
import Inventory from "./component/Inventory/Inventory";
import PrivateRoute from "./component/Routes/PrivateRoute";
import Profile from "./component/Profile/Profile";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: "/",
          loader: async () => fetch("https://ema-john-server-eosin.vercel.app/products"),
          element: <Shop></Shop>
        },
        {
          path: '/inventory',
          element: <PrivateRoute><Inventory></Inventory></PrivateRoute>,
          loader: async () => fetch("https://ema-john-server-eosin.vercel.app/products")
        },
        {
          path: "/product/:id",
          element: <SingleProductOverview></SingleProductOverview>,
          loader: async ({ params }) => {
            return fetch(`https://ema-john-server-eosin.vercel.app/products/${params.id}`);
          },
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
          path: '/profile',
          element: <Profile></Profile>
        }
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
