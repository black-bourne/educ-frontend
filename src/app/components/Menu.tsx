"use client"

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

import Image from "next/image";
import Link from "next/link";

const mainItems = [
  {
    title: "DASHBOARD",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/",
        visible: ["teacher", "student"],
      },
      {
        icon: "/student.png",
        label: "Students",
        href: "/list/students",
        visible: ["teacher"],
      },
      {
        icon: "/lesson.png",
        label: "Lessons",
        href: "/list/lessons",
        visible: ["teacher"],
      },
      {
        icon: "/exam.png",
        label: "Exams",
        href: "/list/exams",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/assignment.png",
        label: "Assignments",
        href: "/list/assignments",
        visible: ["teacher", "student"],
      },
      {
        icon: "/result.png",
        label: "Results",
        href: "/list/results",
        visible: ["teacher", "student"],
      },
      {
        icon: "/attendance.png",
        label: "Attendance",
        href: "/list/attendance",
        visible: ["teacher"],
      },
      {
        icon: "/calendar.png",
        label: "Events",
        href: "/list/events",
        visible: ["teacher", "student"],
      },
      {
        icon: "/announcement.png",
        label: "Announcements",
        href: "/list/announcements",
        visible: ["teacher", "student"],
      },
    ],
  },
  {
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
        visible: ["teacher", "student"],
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
        visible: ["teacher", "student"],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
        visible: ["teacher", "student"],
      },
    ],
  },
];

const Menu = () => {
  const role = useSelector((state: RootState) => state.auth.role);
  return (
    <div className="mt-3 text-sm">
      {mainItems.map((ite) => (
        <div className="flex flex-col gap-2" key={ite.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {ite.title}
          </span>
          {ite.items.map((item) => {
            if (item.visible.includes(role)) {
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight"
                >
                  <Image src={item.icon} alt="" width={20} height={20} />
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
