import { useMsal } from "@azure/msal-react";
import { useState } from "react";
import userInfo from "../hooks/UserHook.jsx"; // Adjust the import path as necessary
import logo from "../assets/Flourish_Logo.png"; // Adjust the path as necessary

export default function Navbar() {
  const { instance, accounts } = useMsal();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const user = userInfo(); // Get user info from the custom hook

  const handleLogout = () => {
    setDropdownOpen(false);
    if (accounts.length > 0) {
      instance.logoutPopup({
        account: accounts[0],
        mainWindowRedirectUri: "http://localhost:5173/",
        postLogoutRedirectUri: "http://localhost:5173/",
      });
    } else {
      instance.logoutPopup({
        mainWindowRedirectUri: "http://localhost:5173/",
        postLogoutRedirectUri: "http://localhost:5173/",
      });
    }
  };

  const initials = accounts[0]?.name
    ? accounts[0].name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "AU";

  return (
    <nav className="bg-white border-b border-gray-200 shadow flex items-center justify-between px-8 py-2">
      {/* Left: Logo and Brand */}
      <div className="flex items-center">
        <img src={logo} alt="Flourish Logo" className="h-10 w-10 mr-3" />
        <div>
          <div className="font-extrabold tracking-widest text-gray-800 text-lg leading-tight">
            FLOURISH
          </div>
          <div className="text-xs tracking-widest text-gray-500 font-semibold leading-none">
            RESEARCH
          </div>
        </div>
      </div>

      {/* Right: User Info and Dropdown */}
      <div className="flex items-center space-x-4 relative">
        <span className="text-gray-700 font-medium">{user?.name}</span>
        <div className="relative">
          <button
            className="flex items-center space-x-2 focus:outline-none"
            onClick={() => setDropdownOpen((open) => !open)}
          >
            <span className="bg-blue-100 text-blue-700 font-bold rounded-full px-3 py-1 text-sm shadow-sm">
              {initials}
            </span>
            <svg
              className="h-4 w-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {/* Dropdown menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg z-50">
              <button
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={handleLogout}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
