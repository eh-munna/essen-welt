import { Button } from '@/components/ui/button';
import { CartContext } from '@/context/cart/CartProvider';
import useCustomer from '@/hooks/useCustomer';
import useTitle from '@/hooks/useTitle';
import { Trash2 } from 'lucide-react';
import { useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UpdateInfoModal from './UpdateInfoModal';

export default function Cart() {
  useTitle('Cart');
  const { cart, removeFromCart } = useContext(CartContext);
  const { customer } = useCustomer();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const {
    phoneNumber,
    deliveryAddress: { city, country, postalCode, street } = {},
  } = customer || {};

  const handlePlaceOrder = () => {
    if (
      phoneNumber === 'defaultValue' ||
      city === 'defaultValue' ||
      country === 'defaultValue' ||
      postalCode === 'defaultValue' ||
      street === 'defaultValue'
    ) {
      setOpen(true);
    } else {
      setOpen(false);
      navigate('/payment');
    }
  };

  const totalAmount = useMemo(
    () =>
      cart?.reduce((total, item) => total + item?.price * item?.quantity, 0),
    [cart]
  );

  const handleDeleteItem = (id) => {
    removeFromCart(id);
  };

  if (!cart || cart?.length === 0) {
    return (
      <section className="container mx-auto px-4 sm:px-6 pt-32 pb-16 min-h-screen flex flex-col justify-center items-center text-center">
        <div className="mb-10 md:mb-14 lg:mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Your <span className="text-orange-500">Cart Is Empty</span>
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Start adding delicious items to your cart
          </p>

          <Button
            onClick={() => navigate('/menu')}
            className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full"
          >
            Browse Menu
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 sm:px-6 pt-28 pb-16 min-h-screen">
      {/* Enhanced Heading */}
      <div className="mb-10 md:mb-14 lg:mb-16 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          Your <span className="text-orange-500">Shopping Cart</span>
        </h2>
        <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Review and proceed with your order
        </p>
      </div>

      {/* Cart Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items - Left Column */}
        <div className="lg:w-2/3">
          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-lg shadow-sm p-6">
            <div className="grid grid-cols-12 gap-4 items-center py-4 border-b border-gray-100 font-medium text-gray-700">
              <div className="col-span-5">Item</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-center">Total</div>
              <div className="col-span-1"></div>
            </div>

            {cart?.map((item) => (
              <div
                key={item?.itemId}
                className="grid grid-cols-12 gap-4 items-center py-6 border-b border-gray-100 last:border-0"
              >
                <div className="col-span-5 flex items-center gap-4">
                  <img
                    src={item?.image}
                    alt={item?.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <p className="font-medium text-gray-800">{item?.name}</p>
                </div>

                <div className="col-span-2 text-center text-orange-600 font-medium">
                  €{item?.price?.toFixed(2)}
                </div>

                <div className="col-span-2 text-center">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-orange-100 text-orange-600 rounded-full">
                    {item?.quantity}x
                  </span>
                </div>

                <div className="col-span-2 text-center font-medium">
                  €{(item?.price * item?.quantity).toFixed(2)}
                </div>

                <div className="col-span-1 flex justify-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteItem(item?.itemId)}
                    className="text-red-500 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile List */}
          <div className="md:hidden space-y-4">
            {cart?.map((item) => (
              <div
                key={item?.itemId}
                className="bg-white rounded-lg shadow-sm p-4"
              >
                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={item?.image}
                      alt={item?.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div>
                      <p className="font-medium text-gray-800">{item?.name}</p>
                      <p className="text-orange-600 font-medium">
                        €{item?.price?.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteItem(item?.itemId)}
                    className="text-red-500 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Quantity:</span>
                    <span className="font-medium">{item?.quantity}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-500">Total:</span>
                    <p className="font-medium">
                      €{(item?.price * item?.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary - Right Column */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-28">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Order Summary
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Items ({cart?.length})</span>
                <span className="font-medium">€{totalAmount?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery</span>
                <span className="font-medium">€0.00</span>
              </div>
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-orange-600">
                    €{totalAmount?.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <Button
              onClick={handlePlaceOrder}
              className="w-full mt-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-medium"
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>

      <UpdateInfoModal open={open} setOpen={setOpen} />
    </section>
  );
}
