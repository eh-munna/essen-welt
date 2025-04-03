import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { MenuItem } from '../Menu';

export default function PopularMenu() {
  const { data: popularItems } = useLoaderData();
  const [activeId, setActiveId] = useState(null);

  const handleToggle = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 text-gray-800">
      {/* Heading with better typography */}
      <div className="mb-10 md:mb-14 lg:mb-16 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          Our <span className="text-orange-500">Popular Items</span>
        </h2>
        <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Customer favorites - always delicious, always satisfying
        </p>
      </div>

      {/* Responsive grid with better spacing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6 md:gap-8 xl:gap-10">
        {popularItems?.map((menuItem) => (
          <motion.div
            key={menuItem?._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
          >
            <MenuItem
              item={menuItem}
              activeId={activeId}
              handleToggle={handleToggle}
            />
          </motion.div>
        ))}
      </div>

      {/* Optional view more button */}
      <div className="mt-12 text-center">
        <Link
          to={'/menu'}
          className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-full transition-all duration-300 hover:shadow-lg"
        >
          View Full Menu
        </Link>
      </div>
    </section>
  );
}
