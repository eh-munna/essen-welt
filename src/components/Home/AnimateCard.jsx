// export default function AnimateCard() {
//   return (
//     <div className="relative p-6 bg-white text-white rounded-xl overflow-hidden border-2 border-red-700">
//       {/* Border Animation */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute w-full h-full animate-borderRun border-gradient"></div>
//       </div>

//       {/* Card Content */}
//       <div className="relative z-10">
//         <p className="text-xl">Running Border Card</p>
//       </div>

//       {/* CSS Animation */}
//       <style>
//         {`
//           @keyframes borderRun {
//             0%   { clip-path: inset(0 100% 100% 0); }  /* Start at bottom-left */
//             25%  { clip-path: inset(0 100% 0 0); }    /* Top-left */
//             50%  { clip-path: inset(100% 100% 0 0); } /* Top-right */
//             75%  { clip-path: inset(100% 0 0 0); }    /* Bottom-right */
//             100% { clip-path: inset(0 0 100% 0); }    /* Back to bottom-left */
//           }

//           .border-gradient {
//             position: absolute;
//             top: -2px;
//             left: -2px;
//             right: -2px;
//             bottom: -2px;
//             border: 3px solid transparent;
//             border-image-source: linear-gradient(90deg, #ff00ff, #00ffff);
//             border-image-slice: 1;
//             animation: borderRun 3s linear infinite;
//           }
//         `}
//       </style>
//     </div>
//   );
// }

// function RunningBorderCard() {
//   return (
//     <div className="relative p-6 bg-gray-900 text-white rounded-xl overflow-hidden border-2 border-gray-700">
//       {/* Border Animation */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute w-full h-full animate-borderRun border-gradient"></div>
//       </div>

//       {/* Card Content */}
//       <div className="relative z-10">
//         <p className="text-xl">Running Border Card</p>
//       </div>

//       {/* CSS Animation */}
//       <style>
//         {`
//           @keyframes borderRun {
//             0%   { clip-path: inset(0 100% 100% 0); }  /* Start at bottom-left */
//             25%  { clip-path: inset(0 100% 0 0); }    /* Top-left */
//             50%  { clip-path: inset(100% 100% 0 0); } /* Top-right */
//             75%  { clip-path: inset(100% 0 0 0); }    /* Bottom-right */
//             100% { clip-path: inset(0 0 100% 0); }    /* Back to bottom-left */
//           }

//           .border-gradient {
//             position: absolute;
//             top: -2px;
//             left: -2px;
//             right: -2px;
//             bottom: -2px;
//             border: 3px solid transparent;
//             border-image-source: linear-gradient(90deg, #ff00ff, #00ffff);
//             border-image-slice: 1;
//             animation: borderRun 3s linear infinite;
//           }
//         `}
//       </style>
//     </div>
//   );
// }
