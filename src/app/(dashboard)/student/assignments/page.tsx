// student/assignments.tsx
"use client";

import { useAssignments } from "@/hooks/useAssignments";
import { submitAssignment } from "@/api/assignments";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { Assignment } from "@/api/assignments";
import toast from "react-hot-toast";

const StudentAssignments = () => {
    const { role } = useSelector((state: RootState) => state.auth);
    const { assignments, loading, error } = useAssignments();
    const [submissions, setSubmissions] = useState<{ [key: number]: File | null }>({});

    const handleFileChange = (assignmentId: number, file: File | null) => {
        if (file) {
            if (!file.name.endsWith('.pdf')) {
                toast.error("Only PDF files are allowed");
                return;
            }
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                toast.error("File size must not exceed 5MB");
                return;
            }
        }
        setSubmissions((prev) => ({ ...prev, [assignmentId]: file }));
    };


    const handleSubmit = async (assignmentId: number) => {
        if (role !== "student") return;
        const file = submissions[assignmentId];
        if (!file) {
            toast.error("Please select a file to submit");
            return;
        }
        try {
            await submitAssignment(assignmentId, file);
            setSubmissions((prev) => ({ ...prev, [assignmentId]: null }));
            toast.success("Assignment submitted successfully");
        } catch (err: any) {
            toast.error(err.response?.data?.detail || "Failed to submit assignment");
        }
    };

    if (loading) return <div className="flex h-full items-center justify-center">Loading...</div>;
    if (error) return <div className="flex h-full items-center justify-center text-red-500">Error: {error}</div>;

    return (
        <div className="p-6 w-full h-full flex flex-col gap-6 overflow-auto">
            <h1 className="text-3xl font-bold text-gray-800">Assignments</h1>
            <div className="flex-1 overflow-auto">
                {assignments.length === 0 ? (
                    <p className="text-gray-500">No assignments available.</p>
                ) : (
                    <div className="space-y-4">
                        {assignments.map((assignment: Assignment) => (
                            <div
                                key={assignment.id}
                                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                            >
                                <h3 className="text-lg font-medium text-gray-800">{assignment.title}</h3>
                                <p className="text-sm text-gray-600">{assignment.description}</p>
                                <p className="text-sm text-gray-500">Subject: {assignment.subject}</p>
                                <p className="text-sm text-gray-500">Due: {assignment.due.toLocaleString()}</p>
                                {assignment.submission_status && (
                                    <p className="text-sm text-gray-500">
                                        Submission Status: {assignment.submission_status}
                                        {assignment.submission_score !== null && ` - Score: ${assignment.submission_score}/100`}
                                    </p>
                                )}
                                <div className="mt-4">
                                    {assignment.submission_status ? (
                                        <p className="text-green-600 text-sm">Submitted!</p>
                                    ) : (
                                        <>
                                            <label
                                                htmlFor={`file-${assignment.id}`}
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                Upload Submission (PDF)
                                            </label>
                                            <input
                                                id={`file-${assignment.id}`}
                                                type="file"
                                                accept=".pdf"
                                                onChange={(e) => handleFileChange(assignment.id, e.target.files?.[0] || null)}
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            />
                                            <button
                                                onClick={() => handleSubmit(assignment.id)}
                                                disabled={!submissions[assignment.id]}
                                                className="mt-2 w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700 disabled:bg-gray-400 transition-colors"
                                            >
                                                Submit
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentAssignments;