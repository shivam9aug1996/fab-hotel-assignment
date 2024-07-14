import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Fab Hotels. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
