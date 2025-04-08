// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog';

// import PropTypes from 'prop-types';

// const ReviewSlider = ({ open, setOpen, reviews, index, setIndex }) => {
//   const next = () => {
//     setIndex((prev) => (prev + 1) % reviews.length);
//   };

//   const prev = () => {
//     setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogContent className="max-w-lg">
//         <DialogHeader>
//           <DialogTitle className="text-center text-orange-600">
//             {reviews[index]?.name}
//           </DialogTitle>
//         </DialogHeader>

//         <div className="text-center py-4">
//           <p className="italic text-gray-700">"{reviews[index]?.message}"</p>
//         </div>

//         <div className="flex justify-center gap-6 mt-4">
//           <button
//             onClick={prev}
//             className="text-white bg-orange-500 px-4 py-2 rounded hover:bg-orange-600"
//           >
//             ⬅️ Prev
//           </button>
//           <button
//             onClick={next}
//             className="text-white bg-orange-500 px-4 py-2 rounded hover:bg-orange-600"
//           >
//             Next ➡️
//           </button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default ReviewSlider;

// // Props validation

// ReviewSlider.propTypes = {
//   open: PropTypes.bool.isRequired,
//   setOpen: PropTypes.func.isRequired,
//   reviews: PropTypes.arrayOf(
//     PropTypes.shape({
//       name: PropTypes.string.isRequired,
//       message: PropTypes.string.isRequired,
//     })
//   ).isRequired,
//   index: PropTypes.number,
//   setIndex: PropTypes.func.isRequired,
// };

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import PropTypes from 'prop-types';

const ReviewSlider = ({ open, setOpen, reviews, index, setIndex }) => {
  const next = () => {
    setIndex((prev) => (prev + 1) % reviews.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md sm:max-w-lg md:max-w-xl p-0 border-0 bg-transparent">
        <DialogTitle className="sr-only">Review Slider</DialogTitle>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-xl shadow-2xl overflow-hidden relative"
        >
          <Button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 z-10 rounded-full bg-gray-100 shadow-sm hover:bg-gray-200 text-gray-500 transition-colors h-8 w-8"
          >
            <X />
          </Button>

          <div className="p-8">
            <DialogHeader className="mb-6">
              <div className="flex items-center gap-4">
                <img
                  src={reviews[index]?.imageUrl}
                  alt={reviews[index]?.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-2xl font-bold text-[#2D6A4F]">
                    {reviews[index]?.name}
                  </h3>
                  <p className="text-gray-500">{reviews[index]?.position}</p>
                </div>
              </div>
            </DialogHeader>

            <div className="relative min-h-[200px]">
              <motion.p
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="text-gray-700 italic text-lg"
              >
                &quot;{reviews[index]?.review}&quot;
              </motion.p>
            </div>
          </div>

          <div className="flex justify-between items-center bg-gray-50 px-6 py-4 border-t border-gray-200">
            <Button
              onClick={prev}
              className="flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium px-4 py-2 rounded-lg transition-colors bg-transparent border-0 hover:bg-transparent shadow-none"
            >
              <ChevronLeft className="h-5 w-5" /> Previous
            </Button>
            <div className="text-sm text-gray-500">
              {index + 1} / {reviews.length}
            </div>
            <Button
              onClick={next}
              className="flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium px-4 py-2 rounded-lg transition-colors bg-transparent border-0 hover:bg-transparent shadow-none"
            >
              Next <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

ReviewSlider.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      review: PropTypes.string.isRequired,
      position: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
  index: PropTypes.number.isRequired,
  setIndex: PropTypes.func.isRequired,
};

export default ReviewSlider;
