import React, { useState } from "react";

export default function RemittanceFilter({
  startDate,
  endDate,
  remittanceNumber,
  siteName,
  sponsor,
  protocol,
  reconciliationStatus,
  invoiceNo,
  screenNumber,
  randomizedNumber,
  visitName,
  onStartDateChange,
  onEndDateChange,
  onRemittanceNumberChange,
  onSiteNameChange,
  onSponsorChange,
  onProtocolChange,
  onStatusChange,
  onInvoiceChange,
  onScreenNumberChange,
  onRandomizedNumberChange,
  onVisitNameChange,
  onSearch,
  onReset,
  hideExtraFields = false, // NEW PROP
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="bg-white p-2 rounded-lg shadow mb-2">
      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-2 items-center flex-1">
          {/* Quick Search Fields */}
          <div className="w-32">
            <input
              type="date"
              value={startDate}
              onChange={onStartDateChange}
              className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs"
              placeholder="Start Date"
            />
          </div>
          <div className="w-32">
            <input
              type="date"
              value={endDate}
              onChange={onEndDateChange}
              className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs"
              placeholder="End Date"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-2 py-1 text-gray-600 hover:text-gray-800 text-xs flex items-center gap-1"
          >
            {isExpanded ? "Show Less" : "Show More"}
            <span className="material-icons text-sm">
              {isExpanded ? "expand_less" : "expand_more"}
            </span>
          </button>
          <button
            onClick={onSearch}
            className="px-3 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-800 text-xs"
          >
            Search
          </button>
          <button
            onClick={onReset}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-xs"
          >
            Clear Search
          </button>
        </div>
      </div>

      {/* Expanded Filter Section */}
      {isExpanded && (
        <div className="bg-gray-50 border border-gray-200 rounded-md mt-2 p-3">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-2">
            <div className="flex flex-col">
              <label className="text-xs text-gray-700 mb-1 font-medium text-left">
                Remittance Number
              </label>
              <input
                type="text"
                value={remittanceNumber}
                onChange={onRemittanceNumberChange}
                placeholder="e.g. 123456"
                className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-200 text-xs bg-white"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs text-gray-700 mb-1 font-medium text-left">
                Site Name
              </label>
              <input
                type="text"
                value={siteName}
                onChange={onSiteNameChange}
                placeholder="e.g. Main Hospital"
                className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-200 text-xs bg-white"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs text-gray-700 mb-1 font-medium text-left">
                Sponsor
              </label>
              <input
                type="text"
                value={sponsor}
                onChange={onSponsorChange}
                placeholder="e.g. Pfizer"
                className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-200 text-xs bg-white"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs text-gray-700 mb-1 font-medium text-left">
                Protocol
              </label>
              <input
                type="text"
                value={protocol}
                onChange={onProtocolChange}
                placeholder="e.g. ABC-123"
                className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-200 text-xs bg-white"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs text-gray-700 mb-1 font-medium text-left">
                Status
              </label>
              <input
                type="text"
                value={reconciliationStatus}
                onChange={onStatusChange}
                placeholder="e.g. Pending"
                className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-200 text-xs bg-white"
              />
            </div>
            {!hideExtraFields && (
              <>
                <div className="flex flex-col">
                  <label className="text-xs text-gray-700 mb-1 font-medium text-left">
                    Invoice No.
                  </label>
                  <input
                    type="text"
                    value={invoiceNo}
                    onChange={onInvoiceChange}
                    placeholder="e.g. INV-001"
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-200 text-xs bg-white"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs text-gray-700 mb-1 font-medium text-left">
                    Screen Number
                  </label>
                  <input
                    type="text"
                    value={screenNumber}
                    onChange={onScreenNumberChange}
                    placeholder="e.g. 1001"
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-200 text-xs bg-white"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs text-gray-700 mb-1 font-medium text-left">
                    Randomized Number
                  </label>
                  <input
                    type="text"
                    value={randomizedNumber}
                    onChange={onRandomizedNumberChange}
                    placeholder="e.g. 2002"
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-200 text-xs bg-white"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs text-gray-700 mb-1 font-medium text-left">
                    Visit Name
                  </label>
                  <input
                    type="text"
                    value={visitName}
                    onChange={onVisitNameChange}
                    placeholder="e.g. Screening"
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-200 text-xs bg-white"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
