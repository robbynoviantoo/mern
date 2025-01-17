import React from "react";

const Skeleton = ({ rows = 5, columns = 3 }) => {
  return (
    <tbody>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr key={rowIndex} className="animate-pulse bg-gray-50 even:bg-gray-100">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <td key={colIndex} className="px-4 py-2 border">
              <div className="h-4 bg-gray-300 rounded w-full"></div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default Skeleton;
