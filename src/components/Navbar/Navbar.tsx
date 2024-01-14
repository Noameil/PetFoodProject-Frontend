import { Link, NavLink } from "react-router-dom";
import { AiFillShopping } from "react-icons/ai";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaPaw, FaShoppingCart, FaUser } from "react-icons/fa";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
// import "./Navbar.scss";
import { useContext } from "react";
import DarkModeContext from "../../contexts/DarkModeContext";
import AuthContext from "../../contexts/AuthContext";
import AdminRestricted from "../AdminRestricted";
import UserDropdown from "../Dropdown/UserDropdown";

const AdminButton = AdminRestricted(() => {
  return (
    <NavLink to={`/admin`}>
      <MdAdminPanelSettings />
    </NavLink>
  );
});
const Header = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <nav className="fixed top-0 flex justify-start w-full bg-gray-400 py-3 font-medium dark:bg-gray-700 dark:text-white text- md:text-lg">
      <div className="flex justify-around w-3/12 md:w-2/12 items-center">
        <NavLink to="/home">
          <FaPaw />
        </NavLink>
        <AdminButton/>
      </div>
      <div className="w-4/12 md:w-7/12">
        {/* {isLoggedIn && <UserDropdown/>} */}
      </div>
      <div className="flex justify-around w-5/12 md:w-3/12 items-center">
        {isLoggedIn && (
          <button
            onClick={() => {
              logout();
            }}
          >
            Logout
          </button>
        )}
        {isLoggedIn && (
          <NavLink to="/cart" className="">
            <FaShoppingCart />
          </NavLink>
        )}
        {!isLoggedIn && <NavLink to="/login">Login</NavLink>}
        {!isLoggedIn && <NavLink to="/register">Register</NavLink>}
        <button
          onClick={() => {
            toggleDarkMode();
          }}
        >
          {darkMode ? <BsSunFill /> : <BsMoonFill />}
        </button>
      </div>
    </nav>
  );
};

export default Header;
