import React from "react";

export default function Pagination({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
}) {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex items-center justify-end space-x-4 mt-4 mb-2">
      <span className="text-gray-600 text-sm">
        {startItem}-{endItem} of {totalItems} items
      </span>
      <div className="flex items-center space-x-1">
        <button
          className="border border-blue-300 text-blue-400 rounded px-2 py-1 disabled:opacity-50"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          &laquo;
        </button>
        <button
          className="border border-blue-300 text-blue-400 rounded px-2 py-1 disabled:opacity-50"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lsaquo;
        </button>
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => onPageChange(idx + 1)}
            className={`border rounded px-2 py-1 ${
              currentPage === idx + 1
                ? "border-blue-400 text-blue-600 font-bold"
                : "border-blue-300 text-blue-400"
            }`}
          >
            {idx + 1}
          </button>
        ))}
        <button
          className="border border-blue-300 text-blue-400 rounded px-2 py-1 disabled:opacity-50"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &rsaquo;
        </button>
        <button
          className="border border-blue-300 text-blue-400 rounded px-2 py-1 disabled:opacity-50"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          &raquo;
        </button>
      </div>
      <select
        className="border border-blue-300 text-blue-600 rounded px-2 py-1"
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
      >
        {[10, 20, 50].map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
      <span className="text-gray-600 text-sm">Items per page</span>
    </div>
  );
}
