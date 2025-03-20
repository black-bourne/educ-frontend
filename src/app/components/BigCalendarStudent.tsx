"use client";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEventCalendars } from "@/hooks/useEventCalendars";
import { EventCalendar } from "@/api/calendar";

const localizer = momentLocalizer(moment);
const BigCalendar = () => {
  const [event, loading, error] = useEventCalendars();

  if (loading) return <div>Loading calendar events...</div>;
  if (error) return <div>Error loading events: {error}</div>;

  return (
    <Calendar
      localizer={localizer}
      events={Array.isArray(event) ? event : []}
      startAccessor={(event: EventCalendar) => new Date(event.start_time)}
      endAccessor={(event: EventCalendar) => new Date(event.end_time)}
      views={["work_week", "day"]}
      view="day"
      style={{ height: "98%" }}
      min={new Date(2025, 1, 0, 8, 0, 0)}
      max={new Date(2025, 1, 0, 17, 0, 0)}
      tooltipAccessor={(event) => event.description}
    />
  );
};

export default BigCalendar;
