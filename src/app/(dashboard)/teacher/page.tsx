import BigCalendarStudent from "@/app/components/BigCalendarStudent";
import Announcements from "@/app/components/Announcement";

function EventCalendar() {
  return null;
}

const StudentPage = async () => {
  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Schedule</h1>
          dynamic student class
          <BigCalendarStudent />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8 flex-1">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default StudentPage;
