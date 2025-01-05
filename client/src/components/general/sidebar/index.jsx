import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getMeAuthState } from "../../../store/slices/authSlice";

const SidebarComponent = () => {
  const authMeInfoState = useSelector(getMeAuthState);

  return (
    <div className="sidebar">
      <ul>
        {authMeInfoState?.modules?.map((menu, index) => (
          <li className="menu-item " key={index}>
            <NavLink
              to={menu?.link}
              className={({ isActive }) => (isActive ? "active-link" : "")} // Check if route is active
            >
              {menu?.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarComponent;
