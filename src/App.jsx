import { useEffect } from 'react';
import Layout from './Layouts/Layout';
import CartProvider from './context/cart/CartProvider';

import AOS from 'aos';
import 'aos/dist/aos.css';

export default function App() {
  useEffect(() => {
    AOS.init();
    return () => {}; // Cleanup on unmount to prevent memory leaks
  }, []);

  return (
    <>
      <CartProvider>
        <Layout />
      </CartProvider>
    </>
  );
}
