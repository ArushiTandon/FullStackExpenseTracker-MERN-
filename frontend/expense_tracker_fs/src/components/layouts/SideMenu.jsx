import React, { useContext } from 'react';
import { SIDE_MENU_DATA } from '../../util/data';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import UploadProfileImage from '../inputs/UploadProfileImage';

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate('/login');
  };

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20">
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
        <UploadProfileImage />
        <h5 className="text-gray-950 font-medium leading-6 text-center">
          {user?.fullName || ''}
        </h5>
      </div>

      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 ${
            activeMenu === item.label
              ? 'text-white bg-primary'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
