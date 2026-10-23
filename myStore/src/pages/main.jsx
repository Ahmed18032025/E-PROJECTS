import Collection from "./collection.jsx"
// import {Home} from "../pages/Home.jsx"
import {Men} from "../pages/men.jsx"
import {Kids} from "../pages/Kids.jsx"
import { Women } from '../pages/Women.jsx';


import { BrowserRouter, Route, RouterProvider, Routes , createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Home />,
  // },
  {
    path: "/men",
    element: <Men />,
  },
  {
    path: "/women",
    element: <Women />,
  },
  {
    path: "/kids",
    element: <Kids />,
  },
]);

function Main(){
    return (<RouterProvider router={router} />);
}
export default Main;