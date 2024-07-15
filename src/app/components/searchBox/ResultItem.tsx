import Link from "next/link";
import { memo } from "react";

const ResultItem: React.FC<{
  href: string;
  onClick: () => void;
  text: string;
  input: string;
}> = ({ href, onClick, text, input }) => {
  const highlightText = (part: string) => {
    const regex = new RegExp(`(${input})`, "gi");
    const parts = part.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === input.toLowerCase() ? (
        <span key={index} style={{ color: "black", fontWeight: "bold" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const [firstPart, ...restParts] = text.split(",");

  return (
    <Link href={href} onClick={onClick}>
      <div className="p-4 hover:bg-gray-100 cursor-pointer transition duration-300 ease-in-out">
        <p className="text-gray-700 text-sm">
          {highlightText(firstPart)}
          {restParts.length > 0 && (
            <span className="text-gray-400">
              {","}
              {highlightText(restParts.join(","))}
            </span>
          )}
        </p>
      </div>
    </Link>
  );
};

export default memo(ResultItem);
