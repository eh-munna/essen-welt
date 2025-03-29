import useCustomer from '@/hooks/useCustomer';
import useTitle from '@/hooks/useTitle';
import { Mail, MapPin, Phone, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { customer, isLoading } = useCustomer();
  useTitle('Profile');

  if (isLoading) {
    return (
      <div className="text-center py-10 text-gray-600">Loading profile...</div>
    );
  }

  return (
    <section className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6">
      {/* Profile Header */}
      <h2 className="text-2xl font-semibold text-gray-800">Profile</h2>

      {/* Profile Picture & Basic Info */}
      <div className="flex items-center space-x-6">
        {/* Avatar */}
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-3xl font-semibold">
          {customer.firstName || customer.lastName ? (
            <>
              {customer.firstName?.[0]}
              {customer.lastName?.[0]}
            </>
          ) : (
            <User className="w-10 h-10" />
          )}
        </div>

        {/* Name & Contact Info */}
        <div className="space-y-1">
          <h3 className="text-xl font-semibold text-gray-900">
            {customer.firstName} {customer.lastName}
          </h3>

          {/* Email */}
          <p className="flex items-center space-x-2 text-gray-600">
            <Mail className="w-5 h-5 text-gray-500" />
            <span>{customer.email}</span>
          </p>

          {/* Phone */}
          <p className="flex items-center space-x-2 text-gray-600">
            <Phone className="w-5 h-5 text-gray-500" />
            <span>{customer.phoneNumber || 'No phone number'}</span>
          </p>
        </div>
      </div>

      {/* Delivery Address */}
      <div className="border-t pt-4">
        <h4 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-gray-500" />
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
          className="px-4 py-2 flex items-center space-x-2 rounded-md bg-[#2D6A4F] hover:bg-[#21583C] text-white transition duration-300"
        >
          <span>Edit Profile</span>
        </Link>
      </div>
    </section>
  );
}
