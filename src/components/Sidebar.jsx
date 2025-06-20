import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  // Example icons as SVGs (use Heroicons, Remix Icons, or your own)
  const icons = [
    {
      to: "/",
      svg: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h3m10-11v10a1 1 0 01-1 1h-3m-4 0h4"
          />
        </svg>
      ),
      label: "Home",
    },
    // {
    //   to: "/dashboard",
    //   svg: (
    //     <svg
    //       className="h-6 w-6"
    //       fill="none"
    //       stroke="currentColor"
    //       strokeWidth={2}
    //       viewBox="0 0 24 24"
    //     >
    //       <path
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         d="M4 6h16M4 10h16M4 14h16M4 18h16"
    //       />
    //     </svg>
    //   ),
    //   label: "Dashboard",
    // },
    // {
    //   to: "/upload",
    //   svg: (
    //     <svg
    //       className="h-6 w-6"
    //       fill="none"
    //       stroke="currentColor"
    //       strokeWidth={2}
    //       viewBox="0 0 24 24"
    //     >
    //       <path
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         d="M12 4v16m8-8H4"
    //       />
    //     </svg>
    //   ),
    //   label: "Upload",
    // },
  ];

  return (
    <aside
      className={`h-screen bg-white border-b border-gray-200 shadow flex flex-col transition-all duration-300
        ${open ? "w-14" : "w-12"} relative`}
    >
      {/* Collapse/Expand Button */}

      {/* Icons */}
      <nav className="flex flex-col items-center mt-8 space-y-6">
        {icons.map((icon) => (
          <Link
            key={icon.to}
            to={icon.to}
            className={`flex items-center justify-center w-10 h-10 rounded-lg
              ${
                location.pathname === icon.to
                  ? "bg-gray-800 text-white shadow"
                  : "text-gray-400 hover:text-gray-800 hover:bg-blue-50"
              } transition`}
            title={icon.label}
          >
            {icon.svg}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
