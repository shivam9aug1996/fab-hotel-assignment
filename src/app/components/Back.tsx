"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Back = () => {
  const router = useRouter();
  return (
    <button
      className="bg-gray-800 text-white py-2 px-4 rounded mt-6 absolute top-0 left-6"
      onClick={() => router.back()}
    >
      Back
    </button>
  );
};

export default Back;
