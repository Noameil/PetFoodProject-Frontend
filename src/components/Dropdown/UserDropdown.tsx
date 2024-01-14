import { useContext, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import { NavLink } from "react-router-dom";

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const { isLoggedIn, logout } = useContext(AuthContext);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
        onClick={toggleDropdown}
      >
        Hello, {user?.username}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-5 h-5 ml-2 -mr-1 ${
            isOpen ? "text-violet-200" : "text-gray-700"
          } hover:text-violet-100`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 7.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 space-y-2 origin-top-right bg-white border border-gray-300 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <NavLink
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            to=""
          >
            Profile
          </NavLink>
          <NavLink
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            to=""
          >
            Orders
          </NavLink>
          {isLoggedIn && (
            <NavLink
              to="/home"
              className="text-sm"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </NavLink>
          )}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
