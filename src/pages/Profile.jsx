import useCustomer from '@/hooks/useCustomer';
import useTitle from '@/hooks/useTitle';
import { EditIcon, Mail, MapPin, Phone, User } from 'lucide-react';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Profile() {
  const { customer, isLoading, refetch } = useCustomer();
  useTitle('Profile');
  const location = useLocation();
  useEffect(() => {
    if (location?.state?.shouldRefresh) {
      refetch();
      window.history.replaceState({}, '');
    }
  }, [location, refetch]);

  if (isLoading) {
    return (
      <div className="text-center py-10 text-orange-500">
        Loading profile...
      </div>
    );
  }

  return (
    <section className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6 border border-gray-200">
      {/* Profile Header */}
      <h2 className="text-2xl font-semibold text-orange-500">Profile</h2>

      {/* Profile Picture & Basic Info */}
      <div className="flex items-center space-x-6">
        {/* Avatar */}
        <div className="w-20 h-20 bg-gray-100 border border-gray-300 rounded-full flex items-center justify-center text-orange-500 text-3xl font-semibold">
          {customer.firstName || customer.lastName ? (
            <>
              {customer.firstName?.[0]}
              {customer.lastName?.[0]}
            </>
          ) : (
            <User className="w-10 h-10 text-gray-400" />
          )}
        </div>

        {/* Name & Contact Info */}
        <div className="space-y-1">
          <h3 className="text-xl font-semibold text-gray-900">
            {customer?.firstName} {customer?.lastName}
          </h3>

          {/* Email */}
          <p className="flex items-center space-x-2 text-gray-700">
            <Mail className="w-5 h-5 text-orange-500" />
            <span>{customer.email}</span>
          </p>

          {/* Phone */}
          <p className="flex items-center space-x-2 text-gray-700">
            <Phone className="w-5 h-5 text-orange-500" />
            <span>{customer.phoneNumber || 'No phone number'}</span>
          </p>
        </div>
      </div>

      {/* Delivery Address */}
      <div className="border-t pt-4">
        <h4 className="text-lg font-semibold text-orange-600 flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-orange-500" />
          <span>Delivery Address</span>
        </h4>

        {customer.deliveryAddress ? (
          <p className="text-gray-700 mt-1 leading-relaxed">
            {customer.deliveryAddress.street}, {customer.deliveryAddress.city},{' '}
            {customer.deliveryAddress.country} -{' '}
            {customer.deliveryAddress.postalCode}
          </p>
        ) : (
          <p className="text-gray-500">No delivery address provided</p>
        )}
      </div>

      {/* Edit Profile Button */}
      <div className="flex justify-end">
        <Link
          to="/dashboard/edit-profile"
          className="py-2 px-6 flex justify-center items-center space-x-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white transition duration-300 shadow-sm"
        >
          <span>
            <EditIcon size={16} />
          </span>
          <span>Edit Profile</span>
        </Link>
      </div>
    </section>
  );
}
