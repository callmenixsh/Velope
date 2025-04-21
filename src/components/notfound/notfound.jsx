import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-15 font-Content">
      <div className="font-Heading text-4xl md:text-6xl text-red-500 mb-4">404</div>
      <div className="text-xl md:text-2xl  font-medium text-gray-700 dark:text-gray-300 mb-4">
        Oops! The page you're looking for doesn't exist.
      </div>
      <div className="text-sm md:text-base text-gray-500 dark:text-gray-400">
        It seems like the page you're trying to reach is not available. Maybe it was removed or you mistyped the URL.
      </div>
      <div className="mt-6">
        <button
          onClick={() => window.location.href = '/'}
          className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black border-1 border-white dark:border-black rounded-xl hover:invert transition-all duration-300"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
