import React, { lazy, Suspense, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundary from "./components/ErrorBoundary"; // Import ErrorBoundary

const Login = lazy(() => import("./pages/auth/login/Login"));
const Signup = lazy(() => import("./pages/auth/signup/Signup"));
const ProductManagement = lazy(() => import("./components/ProductManagement"));
const OrderManagement = lazy(() => import("./components/OrderManagement")); // Ensure you have this component
const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Product = lazy(() => import("./pages/Product"));
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderHistory = lazy(() => import("./pages/OrderHistory"));
const OrderConfirmation = lazy(() => import("./pages/OrderConfirmation"));

function RoleBasedRoute({ element, role, requiredRole, redirectTo }) {
  return role === requiredRole ? element : <Navigate to={redirectTo} />;
}

function App() {
  // Simulate role retrieval (replace this with actual logic)
  const [role, setRole] = useState('user'); // Default role for demonstration

  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <NavBar />
        <ErrorBoundary>
          <Routes>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />

            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/order-management" element={<OrderManagement />}  />
<Route path="/product-management" element={<ProductManagement />}/>
            <Route
              path="/product-management"
              element={
                <RoleBasedRoute
                  element={<ProductManagement />}
                  role={role}
                     requiredRole="storemanager"
                  redirectTo="/product-management"
                />
              }
            />
            <Route
              path="/order-management"
              element={
                <RoleBasedRoute
                  element={<OrderManagement />}
                  role={role}
                  requiredRole="salesperson"
                  redirectTo="/order-management"
                />
              }
            />
            <Route
              path="/home"
              element={
                <RoleBasedRoute
                  element={<Home />}
                  role={role}
                  requiredRole="user"
                  redirectTo="/auth/login"
                />
              }
            />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </ErrorBoundary>
        <Footer />
      </Router>
    </Suspense>
  );
}

export default App;
