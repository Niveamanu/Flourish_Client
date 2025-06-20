import { useMsal } from "@azure/msal-react";
import logo from "../assets/Flourish_Logo.png"; // Adjust path as needed

export default function Login() {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginRedirect();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-xl shadow-md px-10 py-8 w-full max-w-md flex flex-col items-center">
        {/* Logo and Brand */}
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Flourish Logo" className="h-14 w-14 mb-2" />
          <div className="flex flex-col items-center">
            <span className="font-extrabold text-xl tracking-widest text-gray-900">
              FLOURISH
            </span>
            <span className="text-xs tracking-widest text-gray-500 font-semibold">
              RESEARCH
            </span>
          </div>
        </div>

        {/* Login Title */}
        <h2 className="text-xl font-bold mb-1 text-gray-800">Login</h2>
        <p className="text-gray-400 mb-6 text-center text-sm">
          Welcome back! Please login to your account
        </p>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full py-2 rounded-md  bg-gray-900 hover:bg-gray-900 text-white font-semibold text-lg transition"
        >
          Login with Microsoft
        </button>
      </div>
    </div>
  );
}
