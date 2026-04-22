export type IssueStatus = 'Backlog' | 'To Do' | 'In Progress' | 'In Review' | 'Done';
export type IssuePriority = 'Highest' | 'High' | 'Medium' | 'Low' | 'Lowest';

export interface Issue {
  key: string;
  summary: string;
  status: IssueStatus;
  priority: IssuePriority;
  assignee: { displayName: string; accountId: string } | null;
}
