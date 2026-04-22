import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { DashboardService } from './services/dashboard.service';
import { HeaderComponent } from './components/header/header.component';
import { SprintStatsComponent } from './components/sprint-stats/sprint-stats.component';
import { MemberCardComponent } from './components/member-card/member-card.component';
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';
import { BreakTimerComponent } from './components/break-timer/break-timer.component';
import { WorkflowTrackerComponent } from './components/workflow-tracker/workflow-tracker.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
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
}
