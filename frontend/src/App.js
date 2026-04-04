import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import PostDetails from "./pages/PostDetails";
import Home from "./pages/Home";
import MainLayout from "./pages/MainLayout";
import AdminDashboard from "./pages/AdminDashboard";  
// import AdminPosts from "./pages/AdminPosts";
import AdminPostForm from "./pages/AdminPostForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        {/* <Route path="/admin/posts" element={<AdminPosts />} /> */}
        <Route path="/admin/posts/create" element={<AdminPostForm />} />
        <Route path="/admin/posts/edit/:id" element={<AdminPostForm />} />
                <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/post/:id" element={<PostDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;