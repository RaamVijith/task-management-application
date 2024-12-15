"use client";

import { HambergerMenu, Moon, SearchNormal1, Sun1 } from "iconsax-react";
import React from "react";
import img from "../../../public/profileImg.png";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../redux";
import { setIsDarkMode } from "@/state";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const toggleDarkMode = () => {
    dispatch(setIsDarkMode(!isDarkMode));
  };
  return (
    <div className=" h-[72px] flex justify-between items-center w-full border-b-border border-b-[1px] bg-white">
      {/* LEFT SIDE */}
      <div className="flex items-center gap-5">
        <button className=" bg-gray-100 rounded-full hover:bg-blue-100">
          {/* <Menu className="w-4 h-4" /> */}
        </button>

        <div className="relative  ">
          <input
            type="search"
            placeholder="Search tasks"
            className="w-[408px] h-[44px] border-border border-[1px] rounded-lg p-3 pl-12 gap-3 items-center text-base text-gray-300 font-normal"
          />

          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-non">
            <SearchNormal1 size="20" color="#474747" />
          </div>
        </div>
      </div>

      

      {/* RIGHT SIDE */}
      <div className="flex items-center flex-row gap-5">
      <div className="pt-2">
        <button onClick={toggleDarkMode}>
          {isDarkMode ? (
            <Sun1 size="24" color="#ffffff" />
          ) : (
            <Moon size="24" color="#727272" />
          )}
        </button>
      </div>
      <div className="flex flex-row w-[70px] h-[40px] rounded-[48px] px-2 py-1 mr-10 shadow-sm border-[1px] border-[#F6F6F6] items-center justify-center">
        <HambergerMenu size="20" color="#1C1C1C" />
        <Image src={img} width={32} height={32} alt="Pic" />
      </div>
      </div>
     
    </div>
  );
};

export default Navbar;
