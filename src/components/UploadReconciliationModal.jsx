import React, { useRef, useState } from "react";

export default function UploadReconciliationModal({ open, onClose }) {
  const [uploadType, setUploadType] = useState("bank"); // "bank" or "remit"
  const [bankDepositFile, setBankDepositFile] = useState(null);
  const [remittanceFiles, setRemittanceFiles] = useState([]);
  const fileInputRef = useRef(null);

  if (!open) return null;

  const handleTypeChange = (e) => {
    setUploadType(e.target.value);
    setBankDepositFile(null);
    setRemittanceFiles([]);
  };

  const handleFileChange = (e) => {
    if (uploadType === "bank") {
      setBankDepositFile(e.target.files[0]);
    } else {
      setRemittanceFiles(Array.from(e.target.files));
    }
  };

  const handleProceedClick = () => {
    // Handle upload logic here
    onClose();
  };

  // File input props based on type
  const fileInputProps =
    uploadType === "bank"
      ? {
          accept: ".xlsx,.xls",
          multiple: false,
        }
      : {
          accept: ".xlsx,.xls,.pdf",
          multiple: true,
        };

  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-6">Upload Files</h2>

        {/* Dropdown */}
        <div className="mb-8">
          <label className="block text-gray-700 font-medium mb-2">
            Select Upload Type
          </label>
          <select
            value={uploadType}
            onChange={handleTypeChange}
            className="block w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="bank">Bank Deposit</option>
            <option value="remit">Remittances</option>
          </select>
        </div>

        {/* Upload Area */}
        <div className="mb-8">
          <label className="block text-gray-700 font-medium mb-4">
            {uploadType === "bank"
              ? "Upload Bank Deposit"
              : "Upload Remittance"}
            {uploadType === "bank" && bankDepositFile && (
              <span className="text-gray-500 text-sm ml-2">
                ({bankDepositFile.name})
              </span>
            )}
            {uploadType === "remit" && remittanceFiles.length > 0 && (
              <span className="text-gray-500 text-sm ml-2">
                ({remittanceFiles.length} file
                {remittanceFiles.length > 1 ? "s" : ""} selected)
              </span>
            )}
          </label>
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-6 cursor-pointer hover:border-blue-400 transition"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
              {...fileInputProps}
            />
            <div className="flex flex-col items-center">
              <svg
                className="h-10 w-10 text-blue-400 mb-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 16v4a2 2 0 002 2h6a2 2 0 002-2v-4"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 12v8m0 0l-4-4m4 4l4-4"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20 12V8a2 2 0 00-2-2H6a2 2 0 00-2 2v4"
                />
              </svg>
              <span className="text-blue-600 font-semibold cursor-pointer">
                Browse Files
              </span>
              <span className="text-gray-500 text-sm mt-2">
                Select File{uploadType === "remit" ? "s" : ""} or drag and drop
                here
              </span>
              <span className="text-gray-400 text-xs mt-1">
                Supported File
                {uploadType === "bank"
                  ? " (*.xlsx, *.xls)"
                  : "s (*.xlsx, *.xls, *.pdf)"}
              </span>
            </div>
          </div>
        </div>

        {/* Proceed Button */}
        <div className="flex justify-end">
          <button
            className="bg-gray-800 hover:bg-gray-900 text-white font-semibold px-8 py-2 rounded-md shadow transition"
            onClick={handleProceedClick}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}
