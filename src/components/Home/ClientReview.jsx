// import { cn } from '@/lib/utils';
// import { AnimatePresence, motion } from 'framer-motion';
// import { ArrowRight, Maximize2, Minimize2 } from 'lucide-react';
// import { useState } from 'react';
// import ReviewSlider from '../ReviewSlider';
// import { Button } from '../ui/button';

// export default function ClientReview() {
//   const [expanded, setExpanded] = useState(false);
//   const [index, setIndex] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);

//   const reviews = [
//     {
//       name: 'John Carter',
//       position: 'CEO, Example Corp.',
//       review:
//         'I stumbled upon this place while exploring the neighborhood and I’m so glad I did. The food was absolutely delicious — every bite felt like it was made with love. The staff were friendly and attentive without being overbearing. The cozy atmosphere made it perfect for a quiet dinner. Highly recommend the grilled salmon and their homemade lemonade!',
//       imageUrl: 'https://via.placeholder.com/50',
//     },
//     {
//       name: 'Jane Doe',
//       position: 'Founder, Tech Solutions',
//       review:
//         'We visited on a Friday evening and the place was packed — always a good sign! The wait was about 20 minutes, but once seated, everything went smoothly. The pasta was rich and flavorful, and the dessert (especially the tiramisu) was heavenly. Service was polite, though a bit rushed due to the crowd. Will definitely come back on a quieter day',
//       imageUrl: 'https://via.placeholder.com/50',
//     },
//     {
//       name: 'Mark Smith',
//       position: 'COO, Global Enterprises',
//       review:
//         'Brought my parents here for a weekend dinner and we had a wonderful time. The menu has a great variety, catering to different tastes and dietary needs. Portions were generous, and the presentation was on point. The kids loved the mac & cheese and we couldn’t get enough of the garlic bread. Clean, warm, and inviting — just what you want for a family night out!',
//       imageUrl: 'https://via.placeholder.com/50',
//     },
//   ];

//   const toggleExpand = () => {
//     setExpanded(!expanded);
//   };

//   return (
//     <section
//       className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 relative"
//       id="client-reviews"
//     >
//       <div className="text-center mb-12 md:mb-16 lg:mb-20">
//         <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//           What <span className="text-orange-500">Customers Say</span>
//         </h2>
//         <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
//           Hear from people who&apos;ve experienced our service
//         </p>
//       </div>
//       <div className="flex flex-col gap-6 md:hidden">
//         {reviews.map((review, idx) => (
//           <div className="shadow-xl p-6 rounded-lg  space-y-2" key={idx}>
//             <p>
//               {' '}
//               <span className="font-bold text-[#2D6A4F]">
//                 {review.name}
//               </span>{' '}
//               says,
//             </p>
//             <div className="">
//               <p className="text-[#131313] pr-2 flex justify-baseline">
//                 {review.review.slice(0, 75)} ...{' '}
//                 <span>
//                   <Button
//                     onClick={() => {
//                       setIndex(idx);
//                       setModalOpen(true);
//                     }}
//                     className={
//                       'h-4 w-4 bg-transparent text-orange-500 rounded-sm hover:rounded-sm hover:bg-orange-300 border-0'
//                     }
//                   >
//                     <ArrowRight />
//                   </Button>
//                 </span>
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {modalOpen && (
//         <div className="md:hidden">
//           <ReviewSlider
//             open={modalOpen}
//             setOpen={setModalOpen}
//             reviews={reviews}
//             index={index}
//             setIndex={setIndex}
//           />
//         </div>
//       )}

//       <div className="hidden md:flex md:flex-col justify-center items-center">
//         <motion.div
//           className="relative w-full flex flex-col items-center pt-30"
//           animate={{
//             height: expanded ? reviews.length * 200 + 50 : 250,
//           }}
//           transition={{ type: 'spring', stiffness: 300, damping: 60 }}
//         >
//           <AnimatePresence>
//             {reviews.map((review, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: index * 40, scale: 0.95 }}
//                 animate={{
//                   opacity: 1,
//                   y: expanded ? index * 100 : -index * 12,
//                   scale: expanded ? 1 : 0.95,
//                 }}
//                 exit={{ opacity: 0, y: -20, scale: 0.9 }}
//                 transition={{ type: 'spring', stiffness: 300, damping: 60 }}
//                 className={cn(
//                   `absolute w-[90%] bg-white rounded-lg shadow-[0px_5px_25px_rgba(0,0,0,0.15)] p-6`,
//                   {}
//                 )}
//                 style={{
//                   top: expanded ? index * 120 : index * 40,
//                 }}
//               >
//                 <p className="text-lg italic text-[#131313] mb-4">{`"${review.review}"`}</p>
//                 <div className="flex items-center">
//                   <img
//                     src={review.imageUrl}
//                     alt={review.name}
//                     className="w-12 h-12 rounded-full mr-4"
//                   />
//                   <div>
//                     <p className="font-bold text-[#2D6A4F]">{review.name}</p>
//                     <p className="text-sm text-[#B4B4B4]">{review.position}</p>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </motion.div>
//         <div className="hidden md:block mt-8">
//           <Button
//             onClick={toggleExpand}
//             className="relative cursor-pointer py-3 px-8 rounded-full"
//           >
//             {`${expanded ? 'Hide' : 'Show'} Reviews`}
//             {expanded ? <Minimize2 /> : <Maximize2 />}
//           </Button>
//         </div>
//       </div>
//     </section>
//   );
// }

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Maximize2, Minimize2 } from 'lucide-react';
import { useState } from 'react';
import ReviewSlider from '../ReviewSlider';
import { Button } from '../ui/button';

export default function ClientReview() {
  const [expanded, setExpanded] = useState(false);
  const [index, setIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const reviews = [
    {
      name: 'John Carter',
      position: 'CEO, Example Corp.',
      review:
        'I stumbled upon this place while exploring the neighborhood and I’m so glad I did. The food was absolutely delicious — every bite felt like it was made with love. The staff were friendly and attentive without being overbearing. The cozy atmosphere made it perfect for a quiet dinner. Highly recommend the grilled salmon and their homemade lemonade!',
      imageUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&auto=format&fit=crop',
    },
    {
      name: 'Jane Doe',
      position: 'Founder, Tech Solutions',
      review:
        'We visited on a Friday evening and the place was packed — always a good sign! The wait was about 20 minutes, but once seated, everything went smoothly. The pasta was rich and flavorful, and the dessert (especially the tiramisu) was heavenly. Service was polite, though a bit rushed due to the crowd. Will definitely come back on a quieter day',
      imageUrl:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&auto=format&fit=crop',
    },
    {
      name: 'Mark Smith',
      position: 'COO, Global Enterprises',
      review:
        "Brought my parents here for a weekend dinner and we had a wonderful time. The menu has a great variety, catering to different tastes and dietary needs. Portions were generous, and the presentation was on point. The kids loved the mac & cheese and we couldn't get enough of the garlic bread. Clean, warm, and inviting — just what you want for a family night out!",
      imageUrl:
        'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&auto=format&fit=crop',
    },
  ];

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

      {/* Mobile View */}
      <div className="flex flex-col gap-6 md:hidden">
        {reviews.map((review, idx) => (
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white shadow-lg rounded-xl p-6 space-y-3 border border-gray-100"
            key={idx}
          >
            <div className="flex items-start gap-4">
              <img
                src={review.imageUrl}
                alt={review.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-bold text-[#2D6A4F]">{review.name}</p>
                <p className="text-sm text-gray-500 mb-2">{review.position}</p>
              </div>
            </div>
            <p className="text-gray-700">
              {review.review.slice(0, 100)}...{' '}
              <Button
                onClick={() => {
                  setIndex(idx);
                  setModalOpen(true);
                }}
                className="bg-transparent border-0 shadow-none hover:bg-transparent cursor-pointer text-orange-500 hover:text-orange-600 font-medium inline-flex items-center"
              >
                Read more <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </p>
          </motion.div>
        ))}
      </div>

      {/* Mobile Modal */}
      {modalOpen && (
        <ReviewSlider
          open={modalOpen}
          setOpen={setModalOpen}
          reviews={reviews}
          index={index}
          setIndex={setIndex}
        />
      )}

      {/* Desktop View */}
      <div className="hidden md:flex flex-col items-center">
        <motion.div
          className="relative w-full max-w-4xl flex flex-col items-center"
          animate={{
            height: expanded ? reviews.length * 300 : 300,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 60 }}
        >
          <AnimatePresence>
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: expanded ? i * 200 : i * -20,
                  scale: expanded ? 1 : 1 - i * 0.05,
                  zIndex: expanded ? 1 : reviews.length - i,
                }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 60 }}
                className={`absolute w-full bg-white rounded-xl shadow-lg p-8 border border-gray-100 ${
                  !expanded && i !== reviews?.length - 1 ? 'cursor-pointer' : ''
                }`}
                style={{
                  top: expanded ? i * 100 : index * 40,
                }}
                onClick={() => !expanded && setExpanded(true)}
              >
                <div className="flex flex-col h-full">
                  <p className="text-lg text-gray-700 italic mb-6 flex-grow">
                    &quot;{review.review}&quot;
                  </p>
                  <div className="flex items-center">
                    <img
                      src={review.imageUrl}
                      alt={review.name}
                      className="w-14 h-14 rounded-full object-cover mr-4"
                    />
                    <div>
                      <p className="font-bold text-[#2D6A4F]">{review.name}</p>
                      <p className="text-sm text-gray-500">{review.position}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="mt-8"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={toggleExpand}
            className="py-6 px-8 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-full transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
          >
            {expanded ? (
              <>
                Show Less <Minimize2 className="h-5 w-5" />
              </>
            ) : (
              <>
                Read All Reviews <Maximize2 className="h-5 w-5" />
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
