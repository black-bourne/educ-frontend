"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { useRouter } from "next/navigation";

const AssignmentRedirect = () => {
    const { role } = useSelector((state: RootState) => state.auth);
    const router = useRouter();

    useEffect(() => {
        if (role === "student") {
            router.push("/student/assignments");
        } else if (role === "teacher") {
            router.push("/teacher/assignments");
        } else {
            // Fallback for unexpected roles (e.g., unauthenticated or invalid token)
            router.push("/login");
        }
    }, [role, router]);

};

export default AssignmentRedirect;