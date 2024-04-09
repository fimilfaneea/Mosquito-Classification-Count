import React from "react";
function Navbar(){
  return (
    <div className="flex justify-between h-14 w-full p-5 items-center border-b">
      <div className="  text-gray-600">
      <p><b>DASHBOARD</b></p>
      </div>
      <div>
        <input
          type="text"
          className="block w-full bg-gray-700 text-white border border-transparent focus:border-gray-500 focus:outline-none rounded-full py-2 pl-8 pr-3 placeholder-gray-400 focus:placeholder-gray-300 text-sm"
          placeholder="Search..."
        />
      </div>
    </div>
  );
};

export default Navbar;
