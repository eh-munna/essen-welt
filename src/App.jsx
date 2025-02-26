import Layout from './Layouts/Layout';
import CartProvider from './context/cart/CartProvider';

export default function App() {
  return (
    <>
      <CartProvider>
        <Layout />
      </CartProvider>
    </>
  );
}
