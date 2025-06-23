import React, { useRef, useState, useEffect } from "react";
import userInfo from "../hooks/UserHook.jsx"; // Adjust the import based on your API structure
import SaveFiles from "../hooks/saveFiles"; // Adjust the import based on your API structure
import ReconcileFiles from "../hooks/ReconcileFiles.jsx"; // Adjust the import based on your API structure

// Helper to get file icon based on extension
// Get user info from the custom hook
function getFileIcon(ext) {
  if (["xls", "xlsx"].includes(ext)) {
    return (
      <span className="bg-green-100 rounded px-2 py-1 text-xs font-bold text-green-600 mr-2">
        XLS
      </span>
    );
  }
  if (["pdf"].includes(ext)) {
    return (
      <span className="bg-red-100 rounded px-2 py-1 text-xs font-bold text-red-600 mr-2">
        PDF
      </span>
    );
  }
  if (["doc", "docx"].includes(ext)) {
    return (
      <span className="bg-blue-100 rounded px-2 py-1 text-xs font-bold text-blue-600 mr-2">
        DOC
      </span>
    );
  }
  return (
    <span className="bg-gray-100 rounded px-2 py-1 text-xs font-bold text-gray-600 mr-2">
      FILE
    </span>
  );
}

// Helper to get file size in KB
function getFileSize(size) {
  return `${Math.round(size / 1024)} KB`;
}

export default function NewReconciliationScreen() {
  const [bankDeposit, setBankDeposit] = useState(null);
  const [remittances, setRemittances] = useState([]);
  const bankInputRef = useRef(null);
  const remitInputRef = useRef(null);
  const [status, setStatus] = useState(null); // 'progress', 'success', 'error'
  const [statusMsg, setStatusMsg] = useState("");
  const user = userInfo();
  const [isProcessing, setIsProcessing] = useState(false);
  const [canReconcile, setCanReconcile] = useState(false);

  useEffect(() => {
    if (status) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // Clean up on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [status]);

  // Handle file selection for bank deposit
  const handleBankDepositChange = (e) => {
    const file = e.target.files[0];
    if (file) setBankDeposit(file);
  };

  // Handle file selection for remittances (multiple)
  const handleRemittanceChange = (e) => {
    const files = Array.from(e.target.files);
    setRemittances((prev) => [...prev, ...files]);
  };

  // Remove bank deposit file
  const removeBankDeposit = () => setBankDeposit(null);

  // Remove a remittance file by index
  const removeRemittance = (idx) =>
    setRemittances((prev) => prev.filter((_, i) => i !== idx));
  const handleSubmit = async () => {
    if (!bankDeposit || remittances.length === 0) {
      setStatus("error");
      setStatusMsg(
        "Please upload both Bank Deposit and Remittance files before submitting."
      );
      return;
    }
    setIsProcessing(true);
    setStatus("progress");
    setStatusMsg("File extraction is in progress...");
    try {
      const response = await SaveFiles({
        bankDeposit,
        remittances,
        user: user?.name,
      });
      setStatus("success");
      // setBankDeposit(null);
      // setRemittances([]);
      setStatusMsg(
        response?.message || "Files are extracted and saved. Please reconcile."
      );
      setCanReconcile(true);
    } catch (err) {
      setStatus("error");
      setStatusMsg(
        err?.response?.data?.message ||
          err?.message ||
          "Extraction failed. Please try again."
      );
      setCanReconcile(false);
    }
    setIsProcessing(false);
  };
  const handleReconcile = async () => {
    setIsProcessing(true);
    setStatus("progress");
    setStatusMsg("Reconciling files...");
    try {
      const response = await ReconcileFiles({ user: user?.name });
      setStatus("success");
      setStatusMsg(
        response?.message ||
          "Reconciliation is successful. Please go to home page to check the status."
      );
      setCanReconcile(false);
      setBankDeposit(null);
      setRemittances([]);
    } catch (err) {
      setStatus("error");
      setStatusMsg(
        err?.response?.data?.message ||
          err?.message ||
          "Reconciliation failed. Please try again."
      );
    }
    setIsProcessing(false);
  };
  const StatusAlert = () => {
    if (!status) return null;
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-opacity-30">
        <div className="bg-white rounded-lg shadow-lg px-8 py-6 flex flex-col items-center min-w-[320px]">
          {status === "progress" && (
            <>
              <svg
                className="animate-spin h-8 w-8 text-blue-500 mb-3"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              <span className="text-blue-700 font-medium">{statusMsg}</span>
            </>
          )}
          {status === "success" && (
            <>
              <svg
                className="h-10 w-10 text-green-500 mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-green-700 font-semibold">{statusMsg}</span>
              <button
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={() => setStatus(null)}
              >
                Close
              </button>
            </>
          )}
          {status === "error" && (
            <>
              <svg
                className="h-10 w-10 text-red-500 mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span className="text-red-700 font-semibold">{statusMsg}</span>
              <button
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={() => setStatus(null)}
              >
                Close
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-5">
      {isProcessing && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-opacity-20 flex items-center justify-center pointer-events-auto">
          {/* Optionally, you can show a spinner here */}
        </div>
      )}
      <StatusAlert />
      <div className="bg-white rounded-xl shadow-lg p-8 relative  overflow-y-auto">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-semibold">New Reconciliation</h2>
          </div>
          {!canReconcile && (
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded-md font-semibold flex items-center"
              disabled={isProcessing || status === "progress"}
            >
              Extract Files
            </button>
          )}
          {canReconcile && (
            <button
              onClick={handleReconcile}
              className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded-md font-semibold"
              disabled={isProcessing}
            >
              Reconcile Files
            </button>
          )}
        </div>

        {/* Bank Deposit Section */}
        <div>
          <div className="bg-blue-50 rounded px-4 py-2 font-semibold text-gray-800 mb-2">
            Bank Deposit
          </div>
          <div className="mb-6">
            {bankDeposit ? (
              <div className="flex items-center bg-gray-100 rounded px-4 py-3 mb-2">
                {getFileIcon(bankDeposit.name.split(".").pop().toLowerCase())}
                <div className="flex-1">
                  <div className="font-medium text-gray-900">
                    {bankDeposit.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {getFileSize(bankDeposit.size)}
                  </div>
                </div>
                <button
                  className="ml-4 text-gray-400 hover:text-red-500 text-lg"
                  onClick={removeBankDeposit}
                  aria-label="Remove"
                >
                  &times;
                </button>
              </div>
            ) : (
              <button
                className="bg-gray-100 hover:bg-gray-200 border border-dashed border-gray-300 rounded px-6 py-4 w-full flex items-center justify-center text-gray-500"
                onClick={() => bankInputRef.current.click()}
              >
                <span className="material-icons mr-2">upload_file</span>
                Upload Excel File
                <input
                  ref={bankInputRef}
                  type="file"
                  accept=".xlsx,.xls"
                  className="hidden"
                  onChange={handleBankDepositChange}
                />
              </button>
            )}
          </div>
        </div>

        {/* Remittances Section */}
        <div>
          <div className="bg-blue-50 rounded px-4 py-2 font-semibold text-gray-800 mb-2">
            Remittances
          </div>
          <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-56 overflow-y-auto pr-2">
            {remittances.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center bg-gray-100 rounded px-4 py-3"
              >
                {getFileIcon(file.name.split(".").pop().toLowerCase())}
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{file.name}</div>
                  <div className="text-xs text-gray-500">
                    {getFileSize(file.size)}
                  </div>
                </div>
                <button
                  className="ml-4 text-gray-400 hover:text-red-500 text-lg"
                  onClick={() => removeRemittance(idx)}
                  aria-label="Remove"
                >
                  &times;
                </button>
              </div>
            ))}
            {/* Add More Button */}
            <button
              className="bg-gray-100 hover:bg-gray-200 border border-dashed border-gray-300 rounded px-6 py-4 w-full flex items-center justify-center text-gray-500"
              onClick={() => remitInputRef.current.click()}
            >
              <span className="material-icons mr-2">upload_file</span>
              Add Files
              <input
                ref={remitInputRef}
                type="file"
                accept=".xlsx,.xls,.pdf"
                multiple
                className="hidden"
                onChange={handleRemittanceChange}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
