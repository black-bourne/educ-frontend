"use client";

import { Calendar, momentLocalizer, View, } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEventCalendars } from "@/hooks/useEventCalendars";
import "../styles/BigCalendarEvent.css";
import { useState } from "react";
import { EventCalendar } from "@/api/calendar";

const CustomEvent = ({ event }: { event: EventCalendar }) => (
  <div className="custom-event">
    <strong>{event.title}</strong>
    <div className="event-time">
      {event.start.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}{" "}
      -{" "}
      {event.end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
    </div>
    {event.description && <div className="event-desc">{event.description}</div>}
  </div>
);

const localizer = momentLocalizer(moment);
const BigCalendar = ({
  views = ["work_week", "day"] as View[],
  defaultView = "work_week" as View,
}) => {
  const minTime = new Date();
  minTime.setHours(7, 0, 0);

  const maxTime = new Date();
  maxTime.setHours(19, 0, 0);

  const [event, loading, error] = useEventCalendars();

  // Add state to manage the current view
  const [currentView, setCurrentView] = useState(defaultView);

  if (loading) return <div>Loading calendar events...</div>;
  if (error) return <div>Error loading events: {error}</div>;

  return (
    <div className="flex-1 h-full">
      <Calendar
        className="calendar-container"
        localizer={localizer}
        events={Array.isArray(event) ? event : []}
        startAccessor="start"
        endAccessor="end"
        views={views}
        view={currentView}
        onView={setCurrentView}
        style={{ height: "100%" }} // Changed from 98% to 100%
        tooltipAccessor={(event) => event.description}
        min={minTime}
        max={maxTime}
        components={{ event: CustomEvent }}
      />
    </div>
  );
};

export default BigCalendar;