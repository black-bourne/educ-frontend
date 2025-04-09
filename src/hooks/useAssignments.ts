// hooks/useAssignments.ts
"use client";

import { useEffect, useState } from "react";
import { Assignment, fetchAssignments } from "@/api/assignments";

export const useAssignments = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const fetchedAssignments = await fetchAssignments();
      setAssignments(fetchedAssignments ?? []);
      setError(null);
    } catch (error: any) {
      setError(error.response?.data?.error || error.message || "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { assignments, loading, error, refetch: fetchData };
};