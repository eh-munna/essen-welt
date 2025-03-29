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

  // return (
  //   <section
  //     className="mx-auto p-8 bg-[#2D6A4F] rounded-xl shadow-lg mb-2 relative overflow-hidden"
  //     id="client-reviews"
  //   >
  //     <h2 className="text-3xl font-semibold text-[#E9CBA7] mb-8">
  //       Client Reviews
  //     </h2>
  //     <div className="relative w-full flex flex-col justify-center">
  //       <AnimatePresence>
  //         {reviews.map((review, index) => (
  //           <motion.div
  //             key={index}
  //             initial={{ opacity: 0, y: -index * 10, scale: 0.95 }}
  //             animate={{
  //               opacity: 1,
  //               y: expanded ? index * 110 : -index * 10,
  //               scale: expanded ? 1 : 0.95,
  //             }}
  //             exit={{ opacity: 0, y: -20, scale: 0.9 }}
  //             transition={{ type: 'spring', stiffness: 300, damping: 20 }}
  //             className="absolute w-[90%] bg-white rounded-lg border border-[#B4B4B4] shadow-lg p-6 cursor-pointer"
  //             onClick={toggleExpand}
  //           >
  //             <p className="text-lg italic text-[#2D6A4F] mb-4">{`"${review.review}"`}</p>
  //             <div className="flex items-center">
  //               <img
  //                 src={review.imageUrl}
  //                 alt={review.name}
  //                 className="w-12 h-12 rounded-full mr-4"
  //               />
  //               <div>
  //                 <p className="font-bold text-[#2D6A4F]">{review.name}</p>
  //                 <p className="text-sm text-[#B4B4B4]">{review.position}</p>
  //               </div>
  //             </div>
  //           </motion.div>
  //         ))}
  //       </AnimatePresence>
  //     </div>
  //   </section>
  // );

  return (
    <section
      className="mx-auto p-8 bg-[#2D6A4F] rounded-xl shadow-lg mb-2 relative overflow-hidden"
      id="client-reviews"
    >
      <h2 className="text-3xl font-semibold text-[#E9CBA7] mb-8">
        Client Reviews
      </h2>
      <motion.div
        className="relative w-full flex flex-col items-center overflow-hidden"
        animate={{ height: expanded ? reviews.length * 200 + 50 : 250 }}
        transition={{ type: 'spring', stiffness: 300, damping: 60 }}
      >
        <AnimatePresence>
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -index * 30, scale: 0.95 }}
              animate={{
                opacity: 1,
                y: expanded ? index * 100 : -index * 15,
                scale: expanded ? 1 : 0.95,
              }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 60 }}
              className="absolute w-[90%] bg-white rounded-lg border border-[#B4B4B4] shadow-lg p-6"
              style={{ top: expanded ? index * 120 : index * 40 }}
            >
              <p className="text-lg italic text-[#2D6A4F] mb-4">{`"${review.review}"`}</p>
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

      <Button
        onClick={toggleExpand}
        className={'cursor-pointer shadow-2xs shadow-yellow-500'}
      >
        {`${expanded ? `Hide` : `Show`} Reviews`}{' '}
        {expanded ? <Minimize2 /> : <Maximize2 />}
      </Button>
    </section>
  );

  // const toggleExpand = () => {
  //   setExpanded(!expanded);
  // };

  // return (
  //   <section
  //     className="mx-auto p-8 bg-[#2D6A4F] rounded-xl shadow-lg mb-2 relative overflow-hidden"
  //     id="client-reviews"
  //   >
  //     <h2 className="text-3xl font-semibold text-[#E9CBA7] mb-8">
  //       Client Reviews
  //     </h2>
  //     <div className="relative w-full flex flex-col items-center min-h-screen">
  //       <AnimatePresence>
  //         {reviews.map((review, index) => (
  //           <motion.div
  //             key={index}
  //             initial={{ opacity: 0, y: -index * 15, scale: 0.95 }}
  //             animate={{
  //               opacity: 1,
  //               y: expanded ? -index * 130 : -index * 15,
  //               scale: expanded ? 1 : 0.95,
  //             }}
  //             exit={{ opacity: 0, y: -20, scale: 0.9 }}
  //             transition={{ type: 'spring', stiffness: 300, damping: 20 }}
  //             className="absolute w-[90%] bg-white rounded-lg border border-[#B4B4B4] shadow-lg p-6 cursor-pointer"
  //             onClick={toggleExpand}
  //             style={{ top: expanded ? index * 110 : index * -10 }}
  //           >
  //             <p className="text-lg italic text-[#2D6A4F] mb-4">{`"${review.review}"`}</p>
  //             <div className="flex items-center">
  //               <img
  //                 src={review.imageUrl}
  //                 alt={review.name}
  //                 className="w-12 h-12 rounded-full mr-4"
  //               />
  //               <div>
  //                 <p className="font-bold text-[#2D6A4F]">{review.name}</p>
  //                 <p className="text-sm text-[#B4B4B4]">{review.position}</p>
  //               </div>
  //             </div>
  //           </motion.div>
  //         ))}
  //       </AnimatePresence>
  //     </div>
  //   </section>
  // );
}
