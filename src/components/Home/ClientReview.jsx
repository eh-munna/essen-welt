import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Maximize2, Minimize2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';

export default function ClientReview() {
  const reviews = [
    {
      name: 'John Carter',
      position: 'CEO, Example Corp.',
      review:
        'Working with this company has been an absolute pleasure. Their attention to detail and commitment to excellence has made our project a success. Highly recommend!',
      imageUrl: 'https://via.placeholder.com/50',
    },
    {
      name: 'Jane Doe',
      position: 'Founder, Tech Solutions',
      review:
        "Fantastic service from start to finish! Their team was responsive, professional, and delivered exceptional results. Couldn't be happier with the outcome.",
      imageUrl: 'https://via.placeholder.com/50',
    },
    {
      name: 'Mark Smith',
      position: 'COO, Global Enterprises',
      review:
        'I have worked with many companies over the years, and this one stands out for their top-notch quality and customer service. I will definitely work with them again in the future!',
      imageUrl: 'https://via.placeholder.com/50',
    },
  ];

  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <section
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 relative"
      id="client-reviews"
    >
      <div className="text-center mb-12 md:mb-16 lg:mb-20">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          What <span className="text-orange-500">Customers Say</span>
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
          Hear from people who&apos;ve experienced our service
        </p>
      </div>

      <div className="flex flex-col justify-center items-center">
        <div className="md:hidden mb-8">
          <Button
            onClick={toggleExpand}
            className="relative cursor-pointer py-3 px-8 rounded-full"
          >
            {`${expanded ? 'Hide' : 'Show'} Reviews`}
            {expanded ? <Minimize2 /> : <Maximize2 />}
          </Button>
        </div>
        <motion.div
          className="relative w-full flex flex-col items-center pt-30"
          animate={{
            height: expanded
              ? reviews.length * (window.innerWidth < 391 ? 260 : 200) + 50
              : 250,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 60 }}
        >
          <AnimatePresence>
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: index * 40, scale: 0.95 }}
                animate={{
                  opacity: 1,
                  y: expanded ? index * 100 : -index * 12,
                  scale: expanded ? 1 : 0.95,
                }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300, damping: 60 }}
                className={cn(
                  `absolute w-[90%] bg-white rounded-lg shadow-[0px_5px_25px_rgba(0,0,0,0.15)] p-6`,
                  {}
                )}
                style={{
                  top: expanded
                    ? window.innerWidth < 391
                      ? index === reviews.length - 1
                        ? index * 187
                        : index * 200
                      : index * 120
                    : index * 40,
                }}
              >
                <p className="text-lg italic text-[#131313] mb-4">{`"${review.review}"`}</p>
                <div className="flex items-center">
                  <img
                    src={review.imageUrl}
                    alt={review.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-bold text-[#2D6A4F]">{review.name}</p>
                    <p className="text-sm text-[#B4B4B4]">{review.position}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        <div className="hidden md:block">
          <Button
            onClick={toggleExpand}
            className="relative cursor-pointer py-3 px-8 rounded-full"
          >
            {`${expanded ? 'Hide' : 'Show'} Reviews`}
            {expanded ? <Minimize2 /> : <Maximize2 />}
          </Button>
        </div>
      </div>
    </section>
  );
}
