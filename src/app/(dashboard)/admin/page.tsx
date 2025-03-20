import React from "react";
import UserCards from "@/app/components/UserCards";
import BarChart from "@/app/components/BarChart";
import AttendanceChart from "@/app/components/AttendanceChart";
import FinanceChart from "@/app/components/FinanceChart";

import CalendarEvent from "@/app/components/CalendarEvent";
import Announcement from "@/app/components/Announcement";

const AdminPage = () => {
  return (
    <div className="gap-9 p-6 flex flex-col md:flex-row">
      {/*LEFT PART*/}
      <div className="w-full lg:w-2/3 flex flex-col gap-6">
        {/*Display user cards*/}
        <div className="flex justify-between gap-4 flex-wrap">
          <UserCards type="student" />
          <UserCards type="parent" />
          <UserCards type="teacher" />
          {/*<UserCards type="staff" />*/}
        </div>
        {/*Middle 2 chart in lg: 2nd chart will be bigger than first, in small devices, both take cols, full*/}
        <div className="flex gap-4 flex-col lg:flex-row">
          <div className="w-full lg-w-[60%] h-[440px]">
            <AttendanceChart />
          </div>
          <div className="w-full lg:w-[40%] h-[440px]">
            <BarChart />
          </div>
        </div>
        {/*Bottom chart  */}
        <div className="w-full h-[500px]">
          <FinanceChart />
        </div>
      </div>
      {/*RIGHT PART*/}
      <div className="w-full lg:w-1/3 flex flex-col gap-6 ">
        <CalendarEvent />
        <Announcement />
      </div>
    </div>
  );
};

export default AdminPage;
