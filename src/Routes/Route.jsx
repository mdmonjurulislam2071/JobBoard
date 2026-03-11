import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Layouts/HomeLayouts/Home";
import PostJob from "../Layouts/PostJob/PostJob";
import Register from "../Layouts/Register/Register";
import Login from "../Layouts/LogIn/Login";


export const router = createBrowserRouter([
  {
    path: "/",
   Component:RootLayout,
   children:[
    {
        index:true,
        Component:Home
    },

    {
      path:'postjob',
      Component:PostJob
    }
    ,
    {
      path:'register',
      Component:Register
    }
    ,
    {
      path:'login',
      Component:Login
    }


    


   ]
  },
]);