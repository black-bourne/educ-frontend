"use client"

import React, { useEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import { store, RootState } from "@/redux/store/store";
import { setupAxiosInterceptors } from "@/api/axios";
import Link from "next/link";
import Image from "next/image";
import Menu from "@/app/components/Menu";
import Navbar from "@/app/components/Navbar";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { setToken } from "@/redux/slices/authSlice";


const DashboardContent = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { token, role } = useSelector((state: RootState) => state.auth);
  const [status, setStatus] = useState<"loading" | "unauthorized" | "authorized" | "redirecting">("loading");
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken && !token) {
      dispatch(setToken(storedToken));
    }

    if (!storedToken && !token) {
      router.push("/login");
      setStatus("redirecting");
      return;
    }

    if (token && !role) {
      return; // Let Redux update role in next render
    }

    const isStudentOnTeacherPage = role === "student" && pathname.startsWith("/teacher");
    const isTeacherOnStudentPage = role === "teacher" && pathname.startsWith("/student");

    if (isStudentOnTeacherPage || isTeacherOnStudentPage) {
      setStatus("unauthorized");
      const startTime = Date.now();
      const interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const remaining = 3 - elapsed;
        if (remaining <= 0) {
          clearInterval(interval);
          router.push(role === "student" ? "/student" : "/teacher");
          setStatus("redirecting");
        } else {
          setCountdown(remaining);
        }
      }, 1000);

      return () => clearInterval(interval);
    }

    setStatus("authorized");
    const unsubscribe = setupAxiosInterceptors();
    return () => unsubscribe();
  }, [dispatch, token, role, pathname, router]);

  if (status === "loading" || status === "redirecting") {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (status === "unauthorized") {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-gray-100 text-gray-800">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="mt-4 text-xl">Page Not Found</p>
        <p className="mt-2 text-sm">Redirecting in {countdown} seconds...</p>
      </div>
    );
  }


  return (
    <div className="flex h-screen">
      <div className="w-[14%] md:w-[10%] lg:w-[16%] xl:w-[14%] p-3">
        <Link href="/dashboard" className="flex items-center justify-center lg:justify-start gap-1.5">
          <Image src="/img.png" alt="logo" width={40} height={40} />
          <span className="hidden lg:block">Asterias Academy</span>
        </Link>
        <Menu />
      </div>
      <div className="w-[86%] md:w-[90%] lg:w-[84%] xl:w-[86%] bg-[#B7F7F5] overflow-scroll flex flex-col">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Provider store={store}>
      <DashboardContent>{children}</DashboardContent>
    </Provider>
  );
}
