import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { DashboardService } from './services/dashboard.service';
import { HeaderComponent } from './components/header/header.component';
import { SprintStatsComponent } from './components/sprint-stats/sprint-stats.component';
import { MemberCardComponent } from './components/member-card/member-card.component';
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';
import { BreakTimerComponent } from './components/break-timer/break-timer.component';
import { WorkflowTrackerComponent } from './components/workflow-tracker/workflow-tracker.component';
import { IssueStatus, IssuePriority } from './models/issue.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ToastModule,
    HeaderComponent,
    SprintStatsComponent,
    MemberCardComponent,
    KanbanBoardComponent,
    BreakTimerComponent,
    WorkflowTrackerComponent
  ],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  protected readonly dashboardService = inject(DashboardService);
  private readonly messageService = inject(MessageService);

  ngOnInit(): void {
    this.dashboardService.loadInitialData();
  }

  refreshData(): void {
    this.dashboardService.refresh();
    this.messageService.add({
      severity: 'info',
      summary: 'Actualizando',
      detail: 'Refrescando datos desde Jira...',
      life: 2000
    });
  }

  getStatusClass(status: IssueStatus): string {
    const map: Record<IssueStatus, string> = {
      'Backlog': 'status-badge--backlog',
      'To Do': 'status-badge--todo',
      'In Progress': 'status-badge--inprogress',
      'In Review': 'status-badge--inreview',
      'Done': 'status-badge--done'
    };
    return map[status];
  }

  getPriorityClass(priority: IssuePriority): string {
    const map: Record<IssuePriority, string> = {
      'Highest': 'priority-badge--highest',
      'High': 'priority-badge--high',
      'Medium': 'priority-badge--medium',
      'Low': 'priority-badge--low',
      'Lowest': 'priority-badge--lowest'
    };
    return map[priority];
  }
}
