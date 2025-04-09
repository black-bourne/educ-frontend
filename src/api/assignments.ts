import api from "@/api/axios";

export interface Assignment {
    id: number;
    subject: string;
    title: string;
    description: string;
    due: Date;
    status: string;
    classroom: number | null;
    created_at: Date;
    submission_status?: string | null;
    submission_score?: number | null;
  }

export interface Submission {
    id: number;
    student: string;
    file: string;
    submitted_at: Date;
    status: string;
    score: number | null;
  }

export interface SchoolClass {
  id: number;
  name: string;
}

export const gradeSubmission = async (submissionId: number, status: string, score?: number): Promise<Submission> => {
    const response = await api.post("/api/assignments/grade", { submission_id: submissionId, status, score });
    return {
      id: response.data.id,
      student: "", 
      file: "",    
      submitted_at: new Date(), 
      status: response.data.status,
      score: response.data.score,
    };
  };

export const fetchAssignments = async (): Promise<Assignment[]> => {
    const response = await api.get("/api/assignments");
    return response.data.assignments.map((assignment: any) => ({
      id: assignment.id,
      subject: assignment.subject,
      title: assignment.title,
      description: assignment.description,
      due: new Date(assignment.due),
      status: assignment.status,
      classroom: assignment.classroom,
      created_at: new Date(assignment.created_at),
      submission_status: assignment.submission_status || null,
      submission_score: assignment.submission_score || null,
    }));
  };

export const createAssignment = async (
  assignment: Omit<Assignment, 'id' | 'status' | 'created_at'>
): Promise<Assignment> => {
  const response = await api.post("/api/assignments", {
    title: assignment.title,
    description: assignment.description,
    subject: assignment.subject,
    classroom: assignment.classroom,
    due: assignment.due.toISOString(),
  });
  return {
    id: response.data.id,
    subject: response.data.subject,
    title: response.data.title,
    description: response.data.description,
    due: new Date(response.data.due),
    status: response.data.status,
    classroom: response.data.classroom,
    created_at: new Date(response.data.created_at),
  };
};

export const submitAssignment = async (assignmentId: number, file: File): Promise<Submission> => {
  const formData = new FormData();
  formData.append('assignment_id', assignmentId.toString());
  formData.append('file', file);
  const response = await api.post("/api/assignments/submit", formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return {
    id: response.data.id,
    assignment_id: response.data.assignment_id,
    file: response.data.file,
    submitted_at: new Date(response.data.submitted_at),
  };
};

export const fetchClasses = async (): Promise<SchoolClass[]> => {
  const response = await api.get("/api/classes");
  return response.data.classes.map((cls: any) => ({
    id: cls.id,
    name: cls.name,
  }));
};

export const fetchSubmissions = async (assignmentId: number): Promise<Submission[]> => {
    const response = await api.get("/api/assignments/submissions", {
      params: { assignment_id: assignmentId },
    });
    return response.data.submissions.map((sub: any) => ({
      id: sub.id,
      student: sub.student,
      file: sub.file,
      submitted_at: new Date(sub.submitted_at),
      status: sub.status,
      score: sub.score,
    }));
  };