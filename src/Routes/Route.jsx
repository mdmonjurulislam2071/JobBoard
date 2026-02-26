import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Layouts/HomeLayouts/Home";
import PostJob from "../Layouts/PostJob/PostJob";


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

    


   ]
  },
]);