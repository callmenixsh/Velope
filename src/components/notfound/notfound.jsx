import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-15 px-4 font-Content">
      <div className="font-Heading type-display text-red-500 mb-4">404</div>
      <div className="type-title font-medium text-gray-700 dark:text-gray-300 mb-4">
        Oops! The page you're looking for doesn't exist.
      </div>
      <div className="type-body text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed">
        It seems like the page you're trying to reach is not available. Maybe it was removed or you mistyped the URL.
      </div>
      <div className="mt-6">
        <button
          onClick={() => window.location.href = '/'}
          className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black border-1 border-white dark:border-black rounded-xl hover:invert transition-all duration-300 cursor-pointer"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
