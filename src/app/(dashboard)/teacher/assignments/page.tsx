"use client";

import { useAssignments } from "@/hooks/useAssignments";
import { createAssignment, fetchClasses, fetchSubmissions, gradeSubmission } from "@/api/assignments";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { Assignment, SchoolClass, Submission } from "@/api/assignments";
import toast from "react-hot-toast";

const TeacherAssignments = () => {
    const { role } = useSelector((state: RootState) => state.auth);
    const { assignments, loading, error, refetch } = useAssignments();
    const [classes, setClasses] = useState<SchoolClass[]>([]);
    const [form, setForm] = useState({
        subject: "mathematics" as const,
        title: "",
        description: "",
        due: "",
        classroom: "",
    });
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
    const [submissions, setSubmissions] = useState<Submission[]>([]);

    useEffect(() => {
        const loadClasses = async () => {
            try {
                const fetchedClasses = await fetchClasses();
                setClasses(fetchedClasses);
                if (fetchedClasses.length > 0) {
                    setForm((prev) => ({ ...prev, classroom: fetchedClasses[0].id.toString() }));
                }
            } catch (err) {
                toast.error("Failed to load classes");
            }
        };
        loadClasses();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (role !== "teacher") return;
        try {
            await createAssignment({
                subject: form.subject,
                title: form.title,
                description: form.description,
                due: new Date(form.due),
                classroom: parseInt(form.classroom),
            });
            setForm({ subject: "mathematics", title: "", description: "", due: "", classroom: classes[0]?.id.toString() || "" });
            refetch();
            toast.success("Assignment created successfully");
        } catch (err: any) {
            toast.error(err.response?.data?.detail || "Failed to create assignment");
        }
    };

    const viewSubmissions = async (assignment: Assignment) => {
        setSelectedAssignment(assignment);
        try {
            const fetchedSubmissions = await fetchSubmissions(assignment.id);
            setSubmissions(fetchedSubmissions);
            setModalOpen(true);
        } catch (err) {
            toast.error("Failed to load submissions");
        }
    };

    const handleGrade = async (submissionId: number, score: string) => {
        try {
            const newScore = score ? parseInt(score) : null;
            if (newScore !== null && (newScore < 0 || newScore > 100)) {
                toast.error("Score must be between 0 and 100");
                return;
            }
            await gradeSubmission(submissionId, "graded", newScore);
            setSubmissions((prev) =>
                prev.map((sub) => (sub.id === submissionId ? { ...sub, status: "graded", score: newScore } : sub))
            );
            toast.success("Submission graded successfully");
        } catch (err: any) {
            toast.error(err.response?.data?.detail || "Failed to grade submission");
        }
    };

    if (loading) return <div className="flex h-full items-center justify-center">Loading...</div>;
    if (error) return <div className="flex h-full items-center justify-center text-red-500">Error: {error}</div>;

    return (
        <div className="p-6 w-full h-full flex flex-col gap-6 overflow-auto">
            <h1 className="text-3xl font-bold text-gray-800">Assignments</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Create New Assignment</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                            Subject
                        </label>
                        <select
                            id="subject"
                            value={form.subject}
                            onChange={(e) => setForm({ ...form, subject: e.target.value as any })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="mathematics">Mathematics</option>
                            <option value="english">English</option>
                            <option value="kiswahili">Kiswahili</option>
                            <option value="science">Science</option>
                            <option value="social_studies">Social Studies</option>
                            <option value="cre">CRE</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                            Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter assignment title"
                            required
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter assignment details"
                            rows={3}
                        />
                    </div>
                    <div>
                        <label htmlFor="due" className="block text-sm font-medium text-gray-700 mb-1">
                            Due Date
                        </label>
                        <input
                            id="due"
                            type="datetime-local"
                            value={form.due}
                            onChange={(e) => setForm({ ...form, due: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="classroom" className="block text-sm font-medium text-gray-700 mb-1">
                            Classroom
                        </label>
                        <select
                            id="classroom"
                            value={form.classroom}
                            onChange={(e) => setForm({ ...form, classroom: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            {classes.map((cls) => (
                                <option key={cls.id} value={cls.id}>{cls.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <button
                    type="submit"
                    className="mt-4 w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Create Assignment
                </button>
            </form>
            <div className="flex-1 overflow-auto">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Your Assignments</h2>
                {assignments.length === 0 ? (
                    <p className="text-gray-500">No assignments created yet.</p>
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
                                <p className="text-sm text-gray-500">Class ID: {assignment.classroom}</p>
                                <button
                                    onClick={() => viewSubmissions(assignment)}
                                    className="mt-2 bg-purple-600 text-white p-2 rounded-md hover:bg-purple-700 transition-colors"
                                >
                                    View Submissions
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">
                            Submissions for {selectedAssignment?.title}
                        </h3>
                        {submissions.length === 0 ? (
                            <p className="text-gray-500">No submissions yet.</p>
                        ) : (
                            <ul className="space-y-4 max-h-64 overflow-auto">
                                {submissions.map((sub) => (
                                    <li key={sub.id} className="text-sm text-gray-600 border-b pb-2">
                                        <p>{sub.student} - Submitted: {sub.submitted_at.toLocaleString()}</p>
                                        <p>
                                            Status: {sub.status}{" "}
                                            {sub.score !== null ? `- Score: ${sub.score}/100` : ""}
                                        </p>
                                        <a href={sub.file} target="_blank" className="text-blue-500 hover:underline">
                                            Download
                                        </a>
                                        {sub.status !== "graded" && (
                                            <div className="mt-2 flex gap-2">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    placeholder="Score"
                                                    className="w-20 p-1 border rounded-md"
                                                    onChange={(e) => {
                                                        const score = e.target.value;
                                                        setSubmissions((prev) =>
                                                            prev.map((s) => (s.id === sub.id ? { ...s, score: score ? parseInt(score) : null } : s))
                                                        );
                                                    }}
                                                />
                                                <button
                                                    onClick={() => handleGrade(sub.id, sub.score?.toString() || "")}
                                                    className="bg-green-600 text-white p-1 rounded-md hover:bg-green-700"
                                                >
                                                    Grade
                                                </button>
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                        <button
                            onClick={() => setModalOpen(false)}
                            className="mt-4 w-full bg-gray-600 text-white p-2 rounded-md hover:bg-gray-700 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeacherAssignments;