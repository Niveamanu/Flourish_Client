import React from "react";

export default function RemittanceFilter({
  startDate,
  endDate,
  remittanceNumber,
  onStartDateChange,
  onEndDateChange,
  onRemittanceNumberChange,
  onSearch,
  onReset,
}) {
  return (
    <div className="bg-white p-2 rounded-lg shadow mb-2">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        {/* Start Date */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-0.5">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={onStartDateChange}
            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
          />
        </div>
        {/* End Date */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-0.5">
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={onEndDateChange}
            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
          />
        </div>
        {/* Remittance Number */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-0.5">
            Remittance Number
          </label>
          <input
            type="text"
            value={remittanceNumber}
            onChange={onRemittanceNumberChange}
            placeholder="Enter remittance number"
            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
          />
        </div>
        {/* Action Buttons */}
        <div className="flex items-end space-x-2">
          <button
            onClick={onSearch}
            className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 text-sm"
          >
            Search
          </button>
          <button
            onClick={onReset}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
