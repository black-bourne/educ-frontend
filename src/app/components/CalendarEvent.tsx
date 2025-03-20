"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

// temporary data
const events = [
  {
    id: 1,
    title: "welcome party",
    time: "12:00 PM - 2:00 PM",
    description: "Opening party for fresher students, make sure to attend",
  },
  {
    id: 1,
    title: "welcome party",
    time: "12:00 PM - 2:00 PM",
    description: "Opening party for fresher students, make sure to attend",
  },
];
const CalendarEvent = () => {
  const [value, onChange] = useState<Value>(new Date());
  return (
    <div className="bg-white p-3 rounded-md">
      <Calendar onChange={onChange} value={value} />
      <h1 className="text-xl font-semibold my-4">Events</h1>
      <div className="flex flex-col gap-1">
        {events.map((event) => (
          <div
            className="p-4 rounded-md border-y-gray-2300 border-t-3 odd:border-t-cyan-300 even:border-t-amber-600"
            key={event.id}
          >
            <div className="flex items-center justify-between">
              <h1 className="capitalize">{event.title}</h1>
              <span className="text-xs text-indigo-950">{event.time}</span>
            </div>
            <p className="py-2">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarEvent;
