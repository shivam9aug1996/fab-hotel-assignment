import React from "react";

const Loading = () => {
  return (
    <div className="w-full">
      <div className="p-6 max-w-4xl mx-auto ">
        <div className="mb-8 h-14  bg-slate-300 "></div>

        <ul className="space-y-8">
          {[1, 2, 3].map((hotel, index) => (
            <li
              key={index}
              className="bg-white shadow-lg rounded-lg border border-gray-300 hover:shadow-xl transition-shadow duration-300 ease-in-out"
            >
              <div className="relative p-6">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg opacity-40"></div>
                <div className="relative h-8 w-1/3 mb-2 bg-slate-300"></div>

                <div className="w-1/4 h-6 mb-4 bg-slate-300"></div>
              </div>
              <div className="p-6 space-y-4">
                <div className="w-full h-8 bg-slate-300"></div>
                <div className="w-full h-8 bg-slate-300"></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Loading;
