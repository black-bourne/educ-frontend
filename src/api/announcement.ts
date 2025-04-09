// api/announcements.ts
import api from "@/api/axios";

export interface Announcement {
  title: string;
  description: string;
  date: Date;
  target_role: string;
  school_class?: number; // Foreign key ID, optional
}

export const fetchAnnouncements = async (): Promise<Announcement[]> => {
  const response = await api.get("/api/announcements");
  return response.data.map((announcement: any) => ({
    title: announcement.title,
    description: announcement.description,
    date: new Date(announcement.date),
    target_role: announcement.target_role,
    school_class: announcement.school_class,
  }));
};