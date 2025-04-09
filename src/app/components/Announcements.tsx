"use client";

import { useAnnouncements } from "@/hooks/useAnnouncements";

const Announcements = () => {
    const [announcements, loading, error] = useAnnouncements();

    if (loading) {
        return <div>Loading announcements...</div>;
    }

    if (error) {
        return <div>Error loading announcements: {error}</div>;
    }

    return (
        <div className="bg-white p-4 rounded-md">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">Announcements</h1>
                <span className="text-xs text-gray-400">View All</span>
            </div>
            <div className="flex flex-col gap-4 mt-4">
                {announcements.map((announcement, index) => (
                    <div
                        key={index}
                        className={`rounded-md p-4 ${index % 3 === 0
                            ? "bg-blue-100" // Light blue
                            : index % 3 === 1
                                ? "bg-green-100" // Light green
                                : "bg-pink-100" // Light pink
                            }`}
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="font-medium">{announcement.title}</h2>
                            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                                {announcement.date.toISOString().split("T")[0]}
                            </span>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">
                            {announcement.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Announcements;