"use client"

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Provider } from "react-redux";

import { store } from "@/redux/store/store";
import Navbar from "@/app/components/Navbar";
import Menu from "@/app/components/Menu";
import { useEffect } from 'react';
import { setupAxiosInterceptors } from '@/api/axios';
import { setToken } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";



export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      dispatch(setToken(token)); // Load token into Redux
    }
    setupAxiosInterceptors(); // Setup Axios with token
  }, [dispatch]);


  return (
    <Provider store={store}>
      <div className="flex h-screen ">
        <div className="w-[14%] md:w-10% lg:w-16% xl:w-14%  p-3">
          <Link
            href="/dashboard"
            className="flex items-center justify-center lg:justify-start gap-1.5"
          >
            <Image src="/img.png" alt="logo" width={40} height={40} />
            <span className="hidden lg:block">Asterias Academy</span>
          </Link>
          <Menu />
        </div>
        <div className="w-[86%] md:w-90% lg:w-84% xl:w-86% bg-[#B7F7F5] overflow-scroll flex flex-col">
          <Navbar />
          {children}
        </div>
      </div>
    </Provider>

  );
}
