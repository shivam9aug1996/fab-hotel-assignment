import React from "react";
import Image from "next/image";
import backgroundImage from "../../../public/hotel-bg.webp";

const Background: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    className="relative min-h-screen flex items-center justify-center"
    style={{ backgroundAttachment: "fixed" }}
  >
    <Image
      src={backgroundImage}
      alt="Hotel Background"
      quality={50}
      className="absolute inset-0"
      style={{ zIndex: -1 }}
      placeholder="blur"
      fill={true}
    />
    <div
      className="absolute inset-0 bg-yellow-50"
      style={{ opacity: 0.4 }}
    ></div>
    {children}
  </div>
);

export default Background;
