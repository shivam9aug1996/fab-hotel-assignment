import React from "react";

const Loading = () => {
  return (
    <div className="mt-5 w-full">
      <div className="p-8 max-w-2xl mx-auto bg-white shadow-2xl rounded-lg border border-gray-200 ">
        <div className="relative mb-6 p-5">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg opacity-50"></div>
          <div className="relative  text-gray-900 h-12 w-1/2 bg-slate-300 mb-6"></div>

          <p className="relative text-md font-medium text-gray-500 p-5">
            <div className="text-lg text-gray-700  w-1/3 bg-slate-300 h-5"></div>
          </p>
        </div>
        <div className="space-y-6">
          <div className="text-lg text-gray-700  w-full bg-slate-300 h-6"></div>
          <div className="text-md text-gray-500 w-full bg-slate-300 h-6"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
