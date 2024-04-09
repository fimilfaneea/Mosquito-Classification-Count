import React, { Children, createContext, useContext, useState } from "react";

import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";

const sidebarContext = createContext();
export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);
  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
      <div className="p-4 pb-2 flex justify-between items-start relative">
          <img
            src="data:image/jpeg;base64,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"
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>
        <sidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3 mt-10">{children}</ul>
        </sidebarContext.Provider>

        <div className="border-t flex p-3 "> 
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <span className="text-xs border-t rounded-md text-gray-600">
                ©2024 CSML.All Rights Reserved
              </span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, alert }) {
  const { expanded } = useContext(sidebarContext);
  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer 
      transition-colors group
      ${
        active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-600"
      }
      h
      
      `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {" "}
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          } `}
        />
      )}

      {!expanded && (
        <div
          className={`
     absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm
     invisible opacity-20 -translate-x-3 transition-all
     group-hover:visible group-hover:opacity-100 group-hover-translate-x-
     `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
