"use client";
import React, { useEffect } from "react";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import StoreProvider, { useAppSelector } from "../redux";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isDarkMood = useAppSelector((state)=> state.global.isDarkMode);

  useEffect(()=> {
    if (isDarkMood) {
    document.documentElement.classList.add( "dark") ;
    } else
    document.documentElement.classList.add( "light") ;
  })

  return (
    <div className={`${isDarkMood? "dark" : "light"} flex bg-[#F6F6F6] text-gray-900 w-full min-h-screen`}>
      <Sidebar />
      <main className="flex flex-col w-full h-full ">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
};

export default DashboardWrapper;
