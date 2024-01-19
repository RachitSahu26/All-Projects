// import React from 'react';

// function Pages({ currentPage, totalPage, onPageChange }) {
//   const pageNumbers = Array.from({ length: totalPage }, (_, index) => index + 1);

//   return (
//     <>
//       <nav aria-label="Page navigation example">


//         <ul className="inline-flex -space-x-px text-md">

//           {/* ...............1................ */}
//           <li>

//             <a
//               href="#"
//               className={`flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === 1 ? 'pointer-events-none' : ''}`}
//               onClick={() => onPageChange(currentPage - 1)}
//             >
//               Previous
//             </a>

//           </li>

//           {/* ...............2................ */}

//           {pageNumbers.slice(0, 10).map((pageNumber) => (
//             <li key={pageNumber}>
//               <a
//                 href="#"
//                 className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === pageNumber ? 'text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' : ''}`}
//                 onClick={() => onPageChange(pageNumber)}
//               >
//                 {pageNumber}
//               </a>
//             </li>
//           ))}




//           {/* ...............3............... */}
//           <li>
//             <a
//               href="#"
//               className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === totalPage ? 'pointer-events-none' : ''}`}
//               onClick={() => onPageChange(currentPage + 1)}
//             >
//               Next
//             </a>
//           </li>





//         </ul>
//       </nav>
//     </>
//   );
// }

// export default Pages;
