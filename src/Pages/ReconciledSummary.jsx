import React, { useState } from "react";
import useRemittancesHistory from "../hooks/GetHistory";
import Pagination from "../components/PaginationComponent";
import RemittanceFilter from "../components/FilterSection.jsx";

export default function ReconciledSummary() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [remittanceNumber, setRemittanceNumber] = useState("");
  const [searchTrigger, setSearchTrigger] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const offset = (currentPage - 1) * pageSize;
  const { remittances, loading, error, totalCount } = useRemittancesHistory(
    pageSize,
    offset,
    startDate,
    endDate,
    remittanceNumber,
    searchTrigger
  );
  const totalItems = totalCount;
  const totalPages = Math.ceil(totalItems / pageSize);

  // Paginate data
  const paginatedRows = remittances;

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };
  const handleSearch = () => {
    setCurrentPage(1);
    setSearchTrigger((prev) => prev + 1);
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setRemittanceNumber("");
    setCurrentPage(1);
    setSearchTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="rounded-lg">
        {/* <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Past Remittances
          </h2>
        </div> */}
        <RemittanceFilter
          startDate={startDate}
          endDate={endDate}
          remittanceNumber={remittanceNumber}
          onStartDateChange={(e) => setStartDate(e.target.value)}
          onEndDateChange={(e) => setEndDate(e.target.value)}
          onRemittanceNumberChange={(e) => setRemittanceNumber(e.target.value)}
          onSearch={handleSearch}
          onReset={handleReset}
        />

        <div className="relative overflow-x-auto">
          <div className="h-full max-h-[calc(100vh-260px)]  overflow-y-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 bg-blue-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-10">
                <tr>
                  {/* <th className="px-4 py-2 text-base">S.No</th> */}
                  <th className="px-4 py-2 text-base">Date Reconciled</th>
                  <th className="px-4 py-2 text-base">Remittance Number</th>
                  <th className="px-4 py-2 text-base">Site Name</th>
                  <th className="px-4 py-2 text-base">Sponsor</th>
                  <th className="px-4 py-2 text-base">Protocol</th>
                  <th className="px-4 py-2 text-base">CRO</th>
                  <th className="px-4 py-2 text-base">Status</th>
                  <th className="px-4 py-2 text-base">PI Name</th>
                  <th className="px-4 py-2 text-base">Invoice No</th>
                  <th className="px-4 py-2 text-base">Invoice Amount</th>
                  <th className="px-4 py-2 text-base">Screen No</th>
                  <th className="px-4 py-2 text-base">Visit Amount</th>
                  <th className="px-4 py-2 text-base">Visit Name</th>
                  <th className="px-4 py-2 text-base">CTMS Amount</th>
                  <th className="px-4 py-2 text-base">Posted Date</th>
                  <th className="px-4 py-2 text-base">Reasons</th>
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
                      {/* <td className="px-4 py-4 text-gray-800">
                        {(currentPage - 1) * pageSize + rowIndex + 1}
                      </td> */}
                      <td className="px-4 py-4 text-gray-800">
                        {row.created_date
                          ? row.created_date.split(" ")[0]
                          : "-"}
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
                        {row.reconciliation_status || "-"}
                      </td>
                      <td className="px-4 py-4 text-gray-800">
                        {row.cro || "-"}
                      </td>
                      <td className="px-4 py-4 text-gray-800">
                        {row.cro || "-"}
                      </td>
                      <td className="px-4 py-4 text-gray-800">
                        {row.cro || "-"}
                      </td>
                      <td className="px-4 py-4 text-gray-800">
                        {row.cro || "-"}
                      </td>
                      <td className="px-4 py-4 text-gray-800">
                        {row.cro || "-"}
                      </td>
                      <td className="px-4 py-4 text-gray-800">
                        {row.cro || "-"}
                      </td>
                      <td className="px-4 py-4 text-gray-800">
                        {row.cro || "-"}
                      </td>
                      <td className="px-4 py-4 text-gray-800">
                        {row.cro || "-"}
                      </td>
                      <td className="px-4 py-4 text-gray-800">
                        {row.cro || "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
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
