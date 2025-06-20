import Navbar from "../components/Navbar";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import UploadReconciliationModal from "../components/UploadReconciliationModal";

export default function MainLayout() {
  // Optional: Only show tabs on certain routes
  const location = useLocation();
  const navigate = useNavigate();
  const showTabs = ["/", "/reconciled-remittances"].includes(location.pathname);
  //const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="min-h-screen h-screen overflow-hidden bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <div className="flex pt-16">
        <div className="fixed top-14 left-0 bottom-0 z-40">
          <Sidebar />
        </div>
        <main className="ml-16 mt-2 mr-5 flex-1 h-[calc(100vh-4rem)] overflow-hidden pl-4">
          {/* Tabs */}
          {showTabs && (
            <nav className="mb-6">
              <div className="flex items-center justify-between">
                <div className="flex space-x-6 ">
                  <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                      `pb-2 px-1 text-lg border-b-2 transition-colors ${
                        isActive
                          ? "border-gray-600 text-gray-700 font-bold"
                          : "border-transparent text-gray-600 hover:text-blue-600"
                      }`
                    }
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/reconciled-remittances"
                    className={({ isActive }) =>
                      `pb-2 px-1 text-lg border-b-2 transition-colors ${
                        isActive
                          ? "border-gray-600 text-gray-700 font-bold"
                          : "border-transparent text-gray-600 hover:text-blue-600"
                      }`
                    }
                  >
                    Reconciled Remittances
                  </NavLink>
                </div>
                {/* {location.pathname === "/" && (
                  <button
                    className="bg-gray-800 text-white px-2 py-0.5 rounded-md flex items-center gap-1 hover:bg-gray-700 transition text-xs"
                    onClick={() => setShowPopup(true)}
                  >
                    <span className="text-base">+</span>
                    <span>New Reconciliation</span>
                  </button>
                )} */}
                {location.pathname === "/" && (
                  <button
                    className="bg-gray-800 text-white px-2 py-0.5 rounded-md flex items-center gap-1 hover:bg-gray-700 transition text-xs"
                    onClick={() => navigate("/upload-files")}
                  >
                    <span className="text-base">+</span>
                    <span>New Reconciliation</span>
                  </button>
                )}
              </div>
            </nav>
          )}
          {/* Popup for New Reconciliation */}
          {/* <UploadReconciliationModal
            open={showPopup}
            onClose={() => setShowPopup(false)}
          /> */}
          {/* Main Content */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
