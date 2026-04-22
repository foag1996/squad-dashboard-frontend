import { Issue } from './issue.model';

export interface Member {
  id: string;
  name: string;
  role: string;
  specialties: string[];
  currentIssue: Issue | null;
  allIssues: Issue[];
  progress: number;
}
