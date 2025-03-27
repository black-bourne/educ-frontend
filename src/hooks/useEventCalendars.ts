"use client"

import { useEffect, useState } from "react";
import { EventCalendar, fetchEventData } from "@/api/calendar";

export const useEventCalendars: () => [
  EventCalendar[],
  boolean,
  string | null,
] = () => {
  const [events, setEvent] = useState<EventCalendar[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchEvents = await fetchEventData();
        setEvent(fetchEvents ?? []);
      } catch (error: any) {
        setError(error.response?.data?.error || error.message || "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return [events, loading, error];
};
