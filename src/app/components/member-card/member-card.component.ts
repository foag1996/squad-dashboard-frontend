import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';
import { ProgressBarModule } from 'primeng/progressbar';
import { TooltipModule } from 'primeng/tooltip';
import { Member } from '../../models/member.model';
import { Issue, IssueStatus } from '../../models/issue.model';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [CommonModule, CardModule, TagModule, BadgeModule, ProgressBarModule, TooltipModule],
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent {
  @Input({ required: true }) member!: Member;

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  getStatusSeverity(status: IssueStatus): 'success' | 'info' | 'warning' | 'danger' | 'secondary' {
    const map: Record<IssueStatus, 'success' | 'info' | 'warning' | 'danger' | 'secondary'> = {
      'Done': 'success',
      'In Progress': 'info',
      'In Review': 'warning',
      'To Do': 'secondary',
      'Backlog': 'secondary'
    };
    return map[status];
  }

  buildTooltipContent(issues: Issue[]): string {
    return issues
      .map(i => `${i.key}: ${i.summary} [${i.status}]`)
      .join('\n');
  }

  getRoleIcon(role: string): string {
    const icons: Record<string, string> = {
      'Tech Lead': 'pi-star',
      'Backend Developer': 'pi-server',
      'Frontend Developer': 'pi-desktop',
      'Fullstack Developer': 'pi-code'
    };
    return icons[role] ?? 'pi-user';
  }
}
