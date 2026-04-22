import { Component, Input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { Issue, IssueStatus, IssuePriority } from '../../models/issue.model';

interface KanbanColumn {
  id: IssueStatus;
  label: string;
  colorClass: string;
  icon: string;
}

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [CommonModule, CardModule, TagModule, BadgeModule, ScrollPanelModule],
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent {
  @Input({ required: true }) issues: Issue[] = [];

  readonly columns: KanbanColumn[] = [
    { id: 'Backlog', label: 'Backlog', colorClass: 'col--backlog', icon: 'pi-inbox' },
    { id: 'To Do', label: 'To Do', colorClass: 'col--todo', icon: 'pi-circle' },
    { id: 'In Progress', label: 'In Progress', colorClass: 'col--inprogress', icon: 'pi-spin pi-spinner' },
    { id: 'In Review', label: 'In Review', colorClass: 'col--inreview', icon: 'pi-eye' },
    { id: 'Done', label: 'Done', colorClass: 'col--done', icon: 'pi-check-circle' }
  ];

  getIssuesByStatus(status: IssueStatus): Issue[] {
    return this.issues.filter(i => i.status === status);
  }

  getPrioritySeverity(priority: IssuePriority): 'success' | 'info' | 'warning' | 'danger' | 'secondary' {
    const map: Record<IssuePriority, 'success' | 'info' | 'warning' | 'danger' | 'secondary'> = {
      'Highest': 'danger',
      'High': 'warning',
      'Medium': 'info',
      'Low': 'success',
      'Lowest': 'secondary'
    };
    return map[priority];
  }

  getPriorityIcon(priority: IssuePriority): string {
    const icons: Record<IssuePriority, string> = {
      'Highest': 'pi-angle-double-up',
      'High': 'pi-angle-up',
      'Medium': 'pi-minus',
      'Low': 'pi-angle-down',
      'Lowest': 'pi-angle-double-down'
    };
    return icons[priority];
  }
}
