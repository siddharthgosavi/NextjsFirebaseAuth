import React from "react";

function Loader() {
  return (
    <div className="fixed bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2">
        <div className="p-3 animate-spin drop-shadow-2xl bg-gradient-to-bl from-pink-400 via-purple-400 to-indigo-600 h-24 w-24 aspect-square rounded-full">
          <div className="rounded-full h-full w-full bg-white dark:bg-gray-900 background-blur-md"></div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
