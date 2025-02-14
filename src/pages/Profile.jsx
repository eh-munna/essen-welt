import React from 'react';

function Person() {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
      <img
        src="https://i.imgur.com/MK3eW3As.jpg"
        alt="Katherine Johnson"
        className="w-full h-64 object-cover"
      />
    </div>
  );
}

function Profile() {
  return (
    <section className="container mx-auto p-6">
      <h1 className="text-4xl font-semibold text-center text-[#2D6A4F] mb-8">
        Amazing Scientists
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <Person />
        <Person />
        <Person />
      </div>
    </section>
  );
}

export default Profile;
