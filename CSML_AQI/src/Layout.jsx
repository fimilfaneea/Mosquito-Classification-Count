import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Sidebar, { SidebarItem } from './components/Sidebar';
import {
  LifeBuoy,
  NotebookPen,
  MapPinned,
  LayoutDashboard,
  Settings,
  Image, // Import Image icon separately
  BringToFront // Import BringToFront icon
} from "lucide-react"; // Import other icons from lucide-react library

const Layout = ({ children }) => {
  const location = useLocation();

  // Function to get the active text based on the current pathname
  const getActiveText = (path) => {
    switch (path) {
      case "/":
        return "Dashboard";
      case "/map":
        return "City Map";
      case "/readings":
        return "Readings";
      case "/images":
        return "Images";
      case "/audio":
        return "Species";
      case "/settings":
        return "Settings";
      case "/help":
        return "Help";
      default:
        return "";
    }
  };

  return (
    <div className="flex">
      <Sidebar>
        <NavLink to="/" activeClassName="active">
          <SidebarItem icon={<LayoutDashboard size={20} />} text={getActiveText("/")} />
        </NavLink>
        <NavLink to="/map" activeClassName="active">
          <SidebarItem icon={<MapPinned size={20} />} text={getActiveText("/map")} />
        </NavLink>
        <NavLink to="/readings" activeClassName="active">
          <SidebarItem icon={<NotebookPen size={20} />} text={getActiveText("/readings")} />
        </NavLink>
        <NavLink to="/images" activeClassName="active">
          <SidebarItem icon={<Image size={20} />} text={getActiveText("/images")} /> {/* Change icon for Images */}
        </NavLink>
        <NavLink to="/audio" activeClassName="active">
          <SidebarItem icon={<BringToFront size={20} />} text={getActiveText("/audio")} /> {/* Change icon for Species */}
        </NavLink>
        <hr className="my-3" />
        <NavLink to="/settings" activeClassName="active">
          <SidebarItem icon={<Settings size={20} />} text={getActiveText("/settings")} />
        </NavLink>
        <NavLink to="/help" activeClassName="active">
          <SidebarItem icon={<LifeBuoy size={20} />} text={getActiveText("/help")} />
        </NavLink>
      </Sidebar>
      <div className="content w-full">{children}</div>
    </div>
  );
};

export default Layout;
