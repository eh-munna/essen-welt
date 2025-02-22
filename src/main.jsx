import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Routes from './Routes/Routes.jsx';
import AuthProvider from './context/authentication/AuthProvider.jsx';
import CartProvider from './context/cart/CartProvider.jsx';
import './index.css';

// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <RouterProvider router={Routes} />
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
    <Toaster />
  </StrictMode>
);
