import Link from "next/link";
import React from "react";
import SearchField from "./SearchField";

const Header = () => {
  return (
    <header className=" shadow-lg p-4 border-b border-gray-200 bg-gray-800">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="font-bold text-white">
            <span
              style={{ backgroundColor: "rgb(254, 227, 63)" }}
              className="inline-flex items-center justify-center text-gray-800 rounded-full w-10 h-10 mr-1"
            >
              fab
            </span>
            HOTELS
          </h1>
        </Link>
        <div className="flex-2 ml-4">
          <SearchField />
        </div>
      </div>
    </header>
  );
};

export default Header;
