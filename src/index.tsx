import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/login';
import Register from './pages/register';
import PrivateRoute from './components/hoc/private-route';
import Product from './pages/products';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<PrivateRoute component={<Product />} />} />
            <Route
                path="*"
                element={<Navigate to="/products" replace />}
            />
        </Routes>
    </BrowserRouter >
);