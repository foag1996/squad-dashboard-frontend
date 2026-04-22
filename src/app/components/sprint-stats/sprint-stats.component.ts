import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';
import { SprintStats } from '../../models/sprint.model';

@Component({
  selector: 'app-sprint-stats',
  standalone: true,
  imports: [CommonModule, CardModule, ProgressBarModule],
  templateUrl: './sprint-stats.component.html',
  styleUrls: ['./sprint-stats.component.scss']
})
export class SprintStatsComponent {
  @Input({ required: true }) stats!: SprintStats;

  get backlogCount(): number {
    return this.stats.total - this.stats.inProgress - this.stats.done;
  }
}
