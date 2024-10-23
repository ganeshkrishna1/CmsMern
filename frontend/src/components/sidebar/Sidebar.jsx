import React, { useState } from "react";
import Control from "../../assets/control.png";
import Logo from "../../assets/logo.png";
import { MdOutlineEventNote } from "react-icons/md";
import { IoManSharp } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { RxDashboard } from "react-icons/rx";
import { NavLink, useNavigate } from "react-router-dom";
import { getUserInfo, removeUserInfo } from "../../services/localStorageInfo";

function Sidebar({ role }) {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const Menus = {
    admin: [
      { title: "Dashboard", icon: <RxDashboard />, url: () => navigate("/dashboard") },
      { title: "Events", icon: <MdOutlineEventNote />, url: () => navigate("/events") },
      { title: "Users", icon: <IoManSharp />, url: () => navigate("/users") },
      { title: "LogOut", icon: <CiLogout />, url: () => {
          removeUserInfo();
          navigate("/login");
        }
      },
    ],
    attendee: [
      { title: "Events", icon: <MdOutlineEventNote />, url: () => navigate("/events") },
      { title: "My Events", icon: <IoManSharp />, url: () => navigate("/myevents") },
      { title: "Notifications", icon: <IoNotifications />, url: () => navigate("/notifications") },
      { title: "LogOut", icon: <CiLogout />, url: () => {
          removeUserInfo();
          navigate("/login");
        }
      },
    ],
    organizer: [
      { title: "Dashboard", icon: <RxDashboard />, url: () => navigate("/dashboard") },
      { title: "Events", icon: <MdOutlineEventNote />, url: () => navigate("/events") },
      { title: "Attendees", icon: <IoManSharp />, url: () => navigate("/attendee-management") },
      { title: "Notifications", icon: <IoNotifications />, url: () => navigate("/notifications") },
      { title: "LogOut", icon: <CiLogout />, url: () => {
          removeUserInfo();
          navigate("/login");
        }
      },
    ],
  };

  return (
    <div className={`flex min-h-screen`}>
      <div className={`${open ? "w-72" : "w-20"} h-full bg-purple-950 p-5 pt-8 duration-300 relative`}>
        <img
          src={Control}
          alt="Control"
          className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 bg-purple-950 ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img src={Logo} alt="Logo" className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`} />
          <h1 className={`text-white origin-left font-medium text-xl duration-300 ${!open && "scale-0"}`}>{getUserInfo().name}</h1>
        </div>
        <ul className="pt-6">
          {Menus[role]?.map((menu, index) => (
            <li onClick={menu.url} key={index} className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-slate-800 rounded-md">
              <div className="flex items-center gap-x-4">
                <span>{menu.icon}</span>
                <span className={`${!open && "hidden"} origin-left duration-200`}>{menu.title}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
