import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Layouts/HomeLayouts/Home";
import PostJob from "../Layouts/PostJob/PostJob";
import Register from "../Layouts/Register/Register";
import Login from "../Layouts/LogIn/Login";
import RecruiterRoute from "../ProtectedRoute/RecruiterRoute";
import ManageJob from "../Layouts/ManageJobForEmployee/ManageJob";
import ApplyJob from "../Components/ApplyJob/ApplyJob";
import MyAppliction from "../Components/ApplyJob/Myapplication/MyAppliction";
import Jobs from "../Components/Jobs/Jobs";
import JobDetails from "../Components/ApplyJob/Myapplication/JobDetails";
import SearchPage from "../Components/SearchPage";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "jobs",
        element: <Jobs />,
      },
      {
        path: "postjob",
        element: (
          <RecruiterRoute>
            <PostJob />
          </RecruiterRoute>
        ),
      },
      {
        path: "manage-job",
        element: (
          <RecruiterRoute>
            <ManageJob />
          </RecruiterRoute>
        ),
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "applyjob/:id",
        element: <ApplyJob />,
      },
      {
        path: "myapplication",
        element: <MyAppliction />,
      },
      {
        path:'jobs/:id',
        Component:JobDetails
      },
      {
        path:'search',
        Component:SearchPage
      }
    ],
  },
]);