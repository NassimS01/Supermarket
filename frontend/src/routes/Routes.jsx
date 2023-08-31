import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter,
  Route,
  Routes as ReactDomRoutes,
} from "react-router-dom";
import Crud from "../pages/Crud/Crud";
import Login from "../pages/Login/LoginPage";
import PanelProducts from "../pages/Crud/PanelsTwo/PanelProducts";
import PanelUsers from "../pages/Crud/UserCrud/PanelUsers";
import PanelOrders from "../pages/Crud/PanelsTwo/PanelOrders";
import NotFound from "../pages/NotFound/NotFound";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home/Home";
import Category from "../pages/Category/Category";
import Signup from "../pages/Signup/SignupPage";

import Cart from "../pages/Cart/Cart";
import Store from "../redux/store";
import { loadUser } from "../redux/actions/user";
import { getAllProducts } from "../redux/actions/product";
import ProtectedAdminRoute from "./ProtectedAdminRoute";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "../pages/Profile/Profile";
import BtnWishlist from "../pages/Profile/ContentProfile/BtnWishlist";
import BtnCart from "../pages/Profile/ContentProfile/BtnCart"
import BtnOrders from "../pages/Profile/ContentProfile/BtnOrders"
import BtnSettings from "../pages/Profile/ContentProfile/BtnSettings"
import PaymentPage from "../pages/Payment/PaymentPage";
import Contact from "../components/Contact/Contact";

const Routes = () => {
  return (
    <BrowserRouter>
      <Layout>
        <ReactDomRoutes>
          <Route path="/" element={<Home />} />
          <Route path="/categorias/:category" element={<Category />} />
          <Route path="/contacto" element={<Contact />} />

          {/* CRUD ADMIN */}
          <Route
            path="/panel-admin/*"
            element={
              <ProtectedAdminRoute>
                <Crud />
              </ProtectedAdminRoute>
            }
          >
            <Route path="products" element={<PanelProducts />} />
            <Route path="users" element={<PanelUsers />} />
            <Route path="orders" element={<PanelOrders />} />
          </Route>

          {/* PANEL USER */}
          <Route
            path="/profile/*"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          >
            <Route
              path="wishlist"
              element={
                <ProtectedRoute>
                  <BtnWishlist />
                </ProtectedRoute>
              }
            />
            <Route
              path="cart"
              element={
                <ProtectedRoute>
                  <BtnCart />
                </ProtectedRoute>
              }
            />
            <Route
              path="orders"
              element={
                <ProtectedRoute>
                  <BtnOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path="settings"
              element={
                <ProtectedRoute>
                  <BtnSettings />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* PAYMENT */}
          <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />
          
          <Route path="*" element={<NotFound />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </ReactDomRoutes>
      </Layout>
    </BrowserRouter>
  );
};

export default Routes;
