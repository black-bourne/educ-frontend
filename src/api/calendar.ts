// fetch from django calender endpoint
const dataUrl = process.env.NEXT_PUBLIC_API_URL;
// console.log("API URL:", dataUrl); // Debugging check

export interface EventCalendar {
  title: string;
  description: string;
  start_time: Date;
  end_time: Date;
  all_day: boolean;
}

export const fetchEventData = async (): Promise<EventCalendar[]> => {
  const response = await fetch(`${dataUrl}/api/calendar-events`);
  if (!response.ok) {
    throw new Error("Failed to fetch calendar events");
  }

  const data = await response.json();
  // Transform the Django field names to what our calendar expects:
  return data.map((event: EventCalendar) => ({
    title: event.title,
    description: event.description,
    start: new Date(event.start_time),
    end: new Date(event.end_time),
    allDay: event.all_day,
  }));
};
