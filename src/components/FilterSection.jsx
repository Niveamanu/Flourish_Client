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
          {!hideExtraFields && (
            <div className="w-40">
              <input
                type="text"
                value={remittanceNumber}
                onChange={onRemittanceNumberChange}
                placeholder="Remittance Number"
                className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs"
              />
            </div>
          )}
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
            Reset
          </button>
        </div>
      </div>

      {/* Expanded Filter Section */}
      {isExpanded && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2 border-t">
          <div>
            <input
              type="text"
              value={siteName}
              onChange={onSiteNameChange}
              placeholder="Site Name"
              className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs"
            />
          </div>
          <div>
            <input
              type="text"
              value={sponsor}
              onChange={onSponsorChange}
              placeholder="Sponsor"
              className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs"
            />
          </div>
          <div>
            <input
              type="text"
              value={protocol}
              onChange={onProtocolChange}
              placeholder="Protocol"
              className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs"
            />
          </div>
          <div>
            <input
              type="text"
              value={reconciliationStatus}
              onChange={onStatusChange}
              placeholder="Status"
              className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs"
            />
          </div>
          {/* Only show these fields if not hidden */}
          {!hideExtraFields && (
            <>
              <div>
                <input
                  type="text"
                  value={invoiceNo}
                  onChange={onInvoiceChange}
                  placeholder="Invoice No."
                  className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs"
                />
              </div>
              <div>
                <input
                  type="text"
                  value={screenNumber}
                  onChange={onScreenNumberChange}
                  placeholder="Screen Number"
                  className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs"
                />
              </div>
              <div>
                <input
                  type="text"
                  value={randomizedNumber}
                  onChange={onRandomizedNumberChange}
                  placeholder="Randomized Number"
                  className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs"
                />
              </div>
              <div>
                <input
                  type="text"
                  value={visitName}
                  onChange={onVisitNameChange}
                  placeholder="Visit Name"
                  className="w-full px-2 py-1 border border-gray-300 rounded-md text-xs"
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
