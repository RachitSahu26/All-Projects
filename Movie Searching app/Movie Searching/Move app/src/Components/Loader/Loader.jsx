import React from 'react';

export default function Loader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div role="status">
        <svg
          aria-hidden="true"
          className="inline w-16 h-16 mr-2 text-gray-200 animate-pulse dark:text-red-600"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
