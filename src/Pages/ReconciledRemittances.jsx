import React, { useState, useEffect } from "react";
import useRemittancesHistory from "../hooks/GetHistory";
import Pagination from "../components/PaginationComponent";
import RemittanceFilter from "../components/FilterSection.jsx";

export default function ReconciledRemittances() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [remittanceNumber, setRemittanceNumber] = useState("");
  const [siteName, setSiteName] = useState("");
  const [sponsor, setSponsor] = useState("");
  const [protocol, setProtocol] = useState("");
  const [reconciliationStatus, setReconciliationStatus] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [screenNumber, setScreenNumber] = useState("");
  const [randomizedNumber, setRandomizedNumber] = useState("");
  const [visitName, setVisitName] = useState("");
  const [searchTrigger, setSearchTrigger] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const offset = (currentPage - 1) * pageSize;
  const { remittances, loading, error, totalCount } = useRemittancesHistory(
    pageSize,
    offset,
    startDate,
    endDate,
    siteName,
    protocol,
    reconciliationStatus,
    sponsor,
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
    setSiteName("");
    setSponsor("");
    setProtocol("");
    setReconciliationStatus("");
    setInvoiceNo("");
    setScreenNumber("");
    setRandomizedNumber("");
    setVisitName("");
    setCurrentPage(1);
    setSearchTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    window.__RECONCILED_HISTORY_EXPORT__ = remittances;
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
          siteName={siteName}
          sponsor={sponsor}
          protocol={protocol}
          reconciliationStatus={reconciliationStatus}
          invoiceNo={invoiceNo}
          screenNumber={screenNumber}
          randomizedNumber={randomizedNumber}
          visitName={visitName}
          onStartDateChange={(e) => setStartDate(e.target.value)}
          onEndDateChange={(e) => setEndDate(e.target.value)}
          onRemittanceNumberChange={(e) => setRemittanceNumber(e.target.value)}
          onSiteNameChange={(e) => setSiteName(e.target.value)}
          onSponsorChange={(e) => setSponsor(e.target.value)}
          onProtocolChange={(e) => setProtocol(e.target.value)}
          onStatusChange={(e) => setReconciliationStatus(e.target.value)}
          onInvoiceChange={(e) => setInvoiceNo(e.target.value)}
          onScreenNumberChange={(e) => setScreenNumber(e.target.value)}
          onRandomizedNumberChange={(e) => setRandomizedNumber(e.target.value)}
          onVisitNameChange={(e) => setVisitName(e.target.value)}
          onSearch={handleSearch}
          onReset={handleReset}
          hideExtraFields={true}
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
