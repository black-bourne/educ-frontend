import api from "@/api/axios"
export interface EventCalendar {
  title: string;
  description: string;
  start_time: Date;
  end_time: Date;
  all_day: boolean;
}

export const fetchEventData = async (): Promise<EventCalendar[]> => {
  const response = await api.get("/api/calendar-events");

  // Transform the Django field names to what our calendar expects:
  return response.data.map((event: EventCalendar) => ({
    title: event.title,
    description: event.description,
    start: new Date(event.start_time),
    end: new Date(event.end_time),
    allDay: event.all_day,
  }));
};
