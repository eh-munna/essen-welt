import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';

import AuthProvider from './context/authentication/AuthProvider.jsx';
import CartProvider from './context/cart/CartProvider.jsx';
import './index.css';
import Routes from './Routes/Routes.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={Routes} />
      </CartProvider>
    </AuthProvider>
    <Toaster />
  </StrictMode>
);
