// hooks/useAnnouncements.ts
"use client";

import { useEffect, useState } from "react";
import { Announcement, fetchAnnouncements } from "@/api/announcement";

export const useAnnouncements = (): [Announcement[], boolean, string | null] => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedAnnouncements = await fetchAnnouncements();
        setAnnouncements(fetchedAnnouncements ?? []);
      } catch (error: any) {
        setError(
          error.response?.data?.error || error.message || "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return [announcements, loading, error];
};