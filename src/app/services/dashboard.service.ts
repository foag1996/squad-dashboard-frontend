import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Issue } from '../models/issue.model';
import { Member } from '../models/member.model';
import { SprintStats } from '../models/sprint.model';
import { environment } from '../../environments/environment';

const MOCK_ISSUES: Issue[] = [
  { key: 'AC-101', summary: 'Implementar dashboard visual del squad', status: 'In Progress', priority: 'High', assignee: { displayName: 'Tech Lead', accountId: 'tl-001' } },
  { key: 'AC-102', summary: 'Crear API REST para datos del sprint', status: 'In Progress', priority: 'High', assignee: { displayName: 'Backend Dev', accountId: 'be-001' } },
  { key: 'AC-103', summary: 'Implementar componentes Angular standalone', status: 'In Progress', priority: 'High', assignee: { displayName: 'Frontend Dev', accountId: 'fe-001' } },
  { key: 'AC-104', summary: 'Integración frontend-backend del dashboard', status: 'In Progress', priority: 'Medium', assignee: { displayName: 'Fullstack Dev', accountId: 'fs-001' } },
  { key: 'AC-95', summary: 'Revisar arquitectura de microservicios', status: 'Done', priority: 'Medium', assignee: { displayName: 'Tech Lead', accountId: 'tl-001' } },
  { key: 'AC-96', summary: 'Configurar pipeline CI/CD', status: 'Done', priority: 'High', assignee: { displayName: 'Backend Dev', accountId: 'be-001' } },
  { key: 'AC-97', summary: 'Setup inicial proyecto Angular 17', status: 'Done', priority: 'High', assignee: { displayName: 'Frontend Dev', accountId: 'fe-001' } },
  { key: 'AC-98', summary: 'Diseño de base de datos', status: 'Done', priority: 'Medium', assignee: { displayName: 'Fullstack Dev', accountId: 'fs-001' } },
  { key: 'AC-105', summary: 'Autenticación JWT con Spring Security', status: 'To Do', priority: 'High', assignee: { displayName: 'Backend Dev', accountId: 'be-001' } },
  { key: 'AC-106', summary: 'Módulo de reportes PDF', status: 'To Do', priority: 'Low', assignee: { displayName: 'Fullstack Dev', accountId: 'fs-001' } },
  { key: 'AC-107', summary: 'Optimización de queries N+1', status: 'In Review', priority: 'Medium', assignee: { displayName: 'Backend Dev', accountId: 'be-001' } },
  { key: 'AC-108', summary: 'Tests E2E con Cypress', status: 'Backlog', priority: 'Low', assignee: { displayName: 'Frontend Dev', accountId: 'fe-001' } },
  { key: 'AC-109', summary: 'Documentación API con Swagger', status: 'In Review', priority: 'Medium', assignee: { displayName: 'Tech Lead', accountId: 'tl-001' } },
  { key: 'AC-110', summary: 'Notificaciones en tiempo real WebSocket', status: 'Backlog', priority: 'Medium', assignee: { displayName: 'Fullstack Dev', accountId: 'fs-001' } },
];

const MOCK_MEMBERS: Member[] = [
  {
    id: 'tech-lead',
    name: 'Tech Lead',
    role: 'Tech Lead',
    specialties: ['Angular', 'Node.js', 'Java Spring Boot', 'Arquitectura', 'Code Review'],
    currentIssue: MOCK_ISSUES[0],
    allIssues: [MOCK_ISSUES[0], MOCK_ISSUES[4], MOCK_ISSUES[12]],
    progress: 65
  },
  {
    id: 'backend-dev',
    name: 'Backend Dev',
    role: 'Backend Developer',
    specialties: ['Java Spring Boot', 'Node.js', 'MySQL', 'PostgreSQL', 'Docker', 'REST APIs'],
    currentIssue: MOCK_ISSUES[1],
    allIssues: [MOCK_ISSUES[1], MOCK_ISSUES[5], MOCK_ISSUES[8], MOCK_ISSUES[10]],
    progress: 50
  },
  {
    id: 'frontend-dev',
    name: 'Frontend Dev',
    role: 'Frontend Developer',
    specialties: ['Angular 17+', 'TypeScript', 'PrimeNG', 'SCSS', 'RxJS', 'Signals'],
    currentIssue: MOCK_ISSUES[2],
    allIssues: [MOCK_ISSUES[2], MOCK_ISSUES[6], MOCK_ISSUES[11]],
    progress: 70
  },
  {
    id: 'fullstack-dev',
    name: 'Fullstack Dev',
    role: 'Fullstack Developer',
    specialties: ['Angular', 'Node.js', 'Express', 'Java', 'MySQL', 'MongoDB'],
    currentIssue: MOCK_ISSUES[3],
    allIssues: [MOCK_ISSUES[3], MOCK_ISSUES[7], MOCK_ISSUES[9], MOCK_ISSUES[13]],
    progress: 45
  }
];

const MOCK_STATS: SprintStats = {
  total: MOCK_ISSUES.length,
  inProgress: MOCK_ISSUES.filter(i => i.status === 'In Progress').length,
  done: MOCK_ISSUES.filter(i => i.status === 'Done').length,
  percentage: Math.round((MOCK_ISSUES.filter(i => i.status === 'Done').length / MOCK_ISSUES.length) * 100),
  sprintName: 'Sprint 12 — Canales y Operaciones'
};

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly baseUrl = environment.apiUrl;

  // Signals para estado reactivo
  readonly issues = signal<Issue[]>(MOCK_ISSUES);
  readonly members = signal<Member[]>(MOCK_MEMBERS);
  readonly stats = signal<SprintStats>(MOCK_STATS);
  readonly loading = signal<boolean>(false);
  readonly lastUpdated = signal<Date>(new Date());
  readonly error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  getIssues(): Observable<Issue[]> {
    return this.http.get<Issue[]>(`${this.baseUrl}/issues`).pipe(
      tap(data => {
        this.issues.set(data);
        this.lastUpdated.set(new Date());
      }),
      catchError(err => {
        console.warn('Backend no disponible, usando datos mock:', err.message);
        this.issues.set(MOCK_ISSUES);
        return of(MOCK_ISSUES);
      })
    );
  }

  getStats(): Observable<SprintStats> {
    return this.http.get<SprintStats>(`${this.baseUrl}/stats`).pipe(
      tap(data => this.stats.set(data)),
      catchError(err => {
        console.warn('Backend no disponible, usando datos mock:', err.message);
        this.stats.set(MOCK_STATS);
        return of(MOCK_STATS);
      })
    );
  }

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(`${this.baseUrl}/members`).pipe(
      tap(data => this.members.set(data)),
      catchError(err => {
        console.warn('Backend no disponible, usando datos mock:', err.message);
        this.members.set(MOCK_MEMBERS);
        return of(MOCK_MEMBERS);
      })
    );
  }

  refresh(): void {
    this.loading.set(true);
    this.error.set(null);

    // Intentar cargar desde backend; si falla, usar mock
    this.getIssues().subscribe({
      next: () => {
        this.getStats().subscribe();
        this.getMembers().subscribe({
          next: () => {
            this.loading.set(false);
            this.lastUpdated.set(new Date());
          },
          error: () => this.loading.set(false)
        });
      },
      error: () => this.loading.set(false)
    });
  }

  loadInitialData(): void {
    this.refresh();
  }
}
