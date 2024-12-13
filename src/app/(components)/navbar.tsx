import React from "react";

const Navbar = () => {
  return (
    <div className="bg-green-50 h-[72px] flex justify-between items-center w-full">
      {/* LEFT SIDE */}
      <div className="flex items-center gap-5">
        <button className=" bg-gray-100 rounded-full hover:bg-blue-100">
          {/* <Menu className="w-4 h-4" /> */}
        </button>

        <div className="relative  border-gray-50 rounded-lg p-3 gap-3 items-center">
          <input
            type="search"
            placeholder="Start type to search groups & products"
            className="w-[400px] h-[44px] "
          />

          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-non">
            {/* <Bell className="text-gray-500" size={20} /> */} viji
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
