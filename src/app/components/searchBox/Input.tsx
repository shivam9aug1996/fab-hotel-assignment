import React, { memo } from "react";
import { InputProps } from "../../types";

const Input = ({ input, handleChange, handleClear }: InputProps) => {
  return (
    <div className="relative">
      <input
        value={input}
        onChange={handleChange}
        placeholder="Search hotels..."
        className="w-full border p-2 rounded-lg shadow pr-7"
      />
      {input && (
        <button
          onClick={handleClear}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
        >
          &#x2715;
        </button>
      )}
    </div>
  );
};

export default memo(Input);
