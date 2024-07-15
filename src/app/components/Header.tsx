import Link from "next/link";
import React from "react";
import SearchField from "./searchBox/SearchField";

const Header = () => {
  return (
    <header className="shadow-lg p-4 bg-gray-800">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="flex items-center font-bold text-white">
            <span className="inline-flex items-center justify-center text-gray-800 bg-yellow-400 rounded-full w-10 h-10 mr-2">
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
