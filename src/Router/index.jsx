import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "../components/ProtectedRoutes";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import AppAccessLayout from "../layouts/AppAccessLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import CreateUser from "../Pages/CreateUser";
import EditUser from "../Pages/EditUser";
import Home from "../Pages/Home";
import Users from "../Pages/Users";
import ViewUser from "../Pages/ViewUser";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoutes><DashboardLayout /></ProtectedRoutes>} >
        <Route index element={<Home />} />
        <Route path="users" element={<Users />} />
        <Route path="users/create" element={<CreateUser />} />
        <Route path="users/edit/:id" element={<EditUser />} />
        <Route path="users/:id" element={<ViewUser />} />
      </Route>
      <Route path="/" element={<AppAccessLayout />} >
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default Router;