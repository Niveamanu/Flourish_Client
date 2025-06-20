import React, { useState } from "react";
import useRemittancesHistory from "../hooks/GetHistory";
import Pagination from "../components/PaginationComponent";

export default function ReconciledRemittances() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const offset = (currentPage - 1) * pageSize;
  const { remittances, loading, error, totalCount } = useRemittancesHistory(
    pageSize,
    offset
  );
  const totalItems = totalCount;
  const totalPages = Math.ceil(totalItems / pageSize);

  // Paginate data
  const paginatedRows = remittances;

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Past Remittances
          </h2>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 bg-blue-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-4 py-2 text-base">S.No</th>
                <th className="px-4 py-2 text-base">Date Reconciled</th>
                <th className="px-4 py-2 text-base">Remittance Number</th>
                <th className="px-4 py-2 text-base">Site Name</th>
                <th className="px-4 py-2 text-base">Sponsor</th>
                <th className="px-4 py-2 text-base">Protocol</th>
                <th className="px-4 py-2 text-base">CRO</th>
                <th className="px-4 py-2 text-base">Reconcillation Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-8">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-red-500">
                    Error loading data
                  </td>
                </tr>
              ) : paginatedRows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8">
                    No remittances found
                  </td>
                </tr>
              ) : (
                paginatedRows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="bg-white dark:bg-gray-800 dark:border-gray-700 border-gray-200 border-b-2"
                  >
                    <td className="px-4 py-4 text-gray-800">
                      {(currentPage - 1) * pageSize + rowIndex + 1}
                    </td>
                    <td className="px-4 py-4 text-gray-800">
                      {row.created_date ? row.created_date.split(" ")[0] : "-"}
                    </td>
                    <td className="px-4 py-4 text-gray-800">
                      {row.remittance_number || "-"}
                    </td>
                    <td className="px-4 py-4 text-gray-800">
                      {row.site_name || "-"}
                    </td>
                    <td className="px-4 py-4 text-gray-800">
                      {row.sponsor || "-"}
                    </td>
                    <td className="px-4 py-4 text-gray-800">
                      {row.protocol || "-"}
                    </td>
                    <td className="px-4 py-4 text-gray-800">
                      {row.cro || "-"}
                    </td>
                    <td className="px-4 py-4 text-gray-800">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold">
                        {row.reconciliation_status || "-"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={setCurrentPage}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>
    </div>
  );
}
