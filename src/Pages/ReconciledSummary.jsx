import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    window.__RECONCILED_SUMMARY_EXPORT__ = remittances;
  }, [remittances]);

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
          <div className="h-full max-h-[calc(100vh-260px)] overflow-y-auto">
            <table className="w-full min-w-max text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 bg-blue-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-10">
                <tr>
                  <th
                    className="px-4 py-2 text-base bg-blue-50 sticky top-0 left-0 z-30 shadow-right"
                    style={{ width: 120 }}
                  >
                    Date
                  </th>
                  <th
                    className="px-4 py-2 text-base bg-blue-50 sticky top-0 left-[120px] z-20 shadow-right"
                    style={{ width: 140 }}
                  >
                    Remittance No.
                  </th>
                  <th
                    className="px-4 py-2 text-base bg-blue-50 sticky top-0 left-[260px] z-10 shadow-right"
                    style={{ width: 130 }}
                  >
                    Status
                  </th>
                  <th
                    className="px-4 py-2 text-base bg-blue-50 sticky top-0 left-[390px] z-0 border-r-4 border-gray-400 shadow-lg"
                    style={{ minWidth: 120 }}
                  >
                    Site Name
                  </th>
                  <th
                    className="px-4 py-2 text-base top-0"
                    style={{ minWidth: 120 }}
                  >
                    Sponsor
                  </th>
                  <th
                    className="px-4 py-2 text-base top-0"
                    style={{ minWidth: 120 }}
                  >
                    Protocol
                  </th>
                  <th
                    className="px-4 py-2 text-base top-0"
                    style={{ minWidth: 120 }}
                  >
                    CRO
                  </th>
                  <th
                    className="px-4 py-2 text-base top-0"
                    style={{ minWidth: 120 }}
                  >
                    PI Name
                  </th>
                  <th
                    className="px-4 py-2 text-base top-0"
                    style={{ minWidth: 120 }}
                  >
                    Withholding
                  </th>
                  <th
                    className="px-4 py-2 text-base top-0"
                    style={{ minWidth: 120 }}
                  >
                    Invoice No.
                    <br />
                    <span className="text-sm font-medium">(Remittance)</span>
                  </th>
                  <th
                    className="px-4 py-2 text-base top-0"
                    style={{ minWidth: 120 }}
                  >
                    Invoice Amount
                    <br />
                    <span className="text-sm font-medium">(Remittance)</span>
                  </th>
                  <th
                    className="px-4 py-2 text-base top-0"
                    style={{ minWidth: 120 }}
                  >
                    Screen No.
                    <br />
                    <span className="text-sm font-medium">(CTMS)</span>
                  </th>
                  <th
                    className="px-4 py-2 text-base top-0"
                    style={{ minWidth: 120 }}
                  >
                    Randomised No.
                    <br />
                    <span className="text-sm font-medium">(CTMS)</span>
                  </th>
                  <th
                    className="px-4 py-2 text-base top-0"
                    style={{ minWidth: 120 }}
                  >
                    Visit Amount
                    <br />
                    <span className="text-sm font-medium">(Remittance)</span>
                  </th>
                  <th
                    className="px-4 py-2 text-base top-0"
                    style={{ minWidth: 120 }}
                  >
                    Visit Name
                    <br />
                    <span className="text-sm font-medium">(CTMS)</span>
                  </th>
                  <th
                    className="px-4 py-2 text-base top-0"
                    style={{ minWidth: 120 }}
                  >
                    Amount in CTMS
                  </th>
                  <th
                    className="px-4 py-2 text-base top-0"
                    style={{ minWidth: 120 }}
                  >
                    Posted Date
                  </th>
                  <th
                    className="px-4 py-2 text-base top-0"
                    style={{ minWidth: 120 }}
                  >
                    Difference
                    <br />
                    <span className="text-sm font-medium">
                      (Amount Paid - CTMS Amount)
                    </span>
                  </th>
                  <th
                    className="px-4 py-2 text-base top-0"
                    style={{ minWidth: 120 }}
                  >
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={19} className="text-center py-8">
                      Loading...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={19} className="text-center py-8 text-red-500">
                      Error loading data
                    </td>
                  </tr>
                ) : paginatedRows.length === 0 ? (
                  <tr>
                    <td colSpan={19} className="text-center py-8">
                      No remittances found
                    </td>
                  </tr>
                ) : (
                  paginatedRows.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className="bg-white dark:bg-gray-800 dark:border-gray-700 border-gray-200 border-b-2"
                    >
                      <td
                        className="px-4 py-4 text-gray-800 bg-white sticky left-0 z-0 shadow-right top-0"
                        style={{ width: 120 }}
                      >
                        {row.created_date
                          ? row.created_date.split(" ")[0]
                          : "-"}
                      </td>
                      <td
                        className="px-4 py-4 text-gray-800 bg-white sticky left-[120px] z-0 shadow-right top-0"
                        style={{ width: 140 }}
                      >
                        {row.remittance_number || "-"}
                      </td>
                      <td
                        className="px-4 py-4 text-gray-800 bg-white sticky left-[260px] z-0 shadow-right top-0"
                        style={{ width: 130 }}
                      >
                        {row.reconciliation_status || "-"}
                      </td>
                      <td
                        className="px-4 py-4 text-gray-800 bg-white sticky left-[390px] z-0 border-r-4 border-gray-400 shadow-lg top-0"
                        style={{ width: 120 }}
                      >
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
                        {row.pi_name || "-"}
                      </td>
                      <td className="px-4 py-4 text-gray-800">
                        {row.withholding || "-"}
                      </td>
                      <td className="px-4 py-4 text-gray-800">
                        {row.invoice_number || "-"}
                      </td>
                      <td className="px-4 py-4 text-gray-800">
                        {row.invoice_amount || "-"}
                      </td>
                      <td className="px-4 py-4 text-gray-800">
                        {row.screen_number || "-"}
                      </td>
                      <td className="px-4 py-4 text-gray-800">
                        {row.randomised_number || "-"}
                      </td>
                      <td className="px-4 py-4 text-gray-800">
                        {row.visit_amount || "-"}
                      </td>
                      <td className="px-4 py-4 text-gray-800">
                        {row.visit_name || "-"}
                      </td>
                      <td className="px-4 py-4 text-gray-800">
                        {row.amount_in_ctms || "-"}
                      </td>
                      <td className="px-4 py-4 text-gray-800">
                        {row.posted_date || "-"}
                      </td>
                      <td className="px-4 py-4 text-gray-800">
                        {row.difference || "-"}
                      </td>
                      <td className="px-4 py-4 text-gray-800">
                        {row.notes || "-"}
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
