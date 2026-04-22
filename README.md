# Squad Dashboard Frontend

Dashboard visual del Squad Canales y Operaciones, construido con Angular 17+, PrimeNG, PrimeFlex y SCSS.

## Stack

- **Angular 17+** — Standalone components, Signals, @if/@for
- **PrimeNG 17** — Componentes UI (Card, Button, Tag, ProgressBar, Tooltip, Toast)
- **PrimeFlex 3** — Layout grid responsive
- **SCSS** — Estilos con CSS variables corporativas
- **TypeScript strict** — Sin `any`

## Instalación y ejecución

```bash
npm install
ng serve
```

Abre `http://localhost:4200` en el navegador.

## Criterios de Aceptación implementados

| C.A. | Descripción | Componente |
|------|-------------|------------|
| C.A.1 | HUs del sprint: Key, Título, Estado, Prioridad, Asignado | `AppComponent` (tabla) |
| C.A.2 | Card por miembro con nombre, rol, especialidades, HU en progreso, % avance | `MemberCardComponent` |
| C.A.3 | Tooltip en hover con lista de todas las HUs del miembro | `MemberCardComponent` |
| C.A.4 | Board Kanban con 5 columnas | `KanbanBoardComponent` |
| C.A.5 | Timer de pausas activas 15 min con Iniciar/Pausar/Reiniciar | `BreakTimerComponent` |
| C.A.6 | Estadísticas del sprint: total, en progreso, completadas, % avance | `SprintStatsComponent` |
| C.A.7 | Angular 17+ standalone, PrimeNG, PrimeFlex, SCSS | Todo el proyecto |
| C.A.9 | Botón de actualización manual sin recargar página | `HeaderComponent` |
| C.A.10 | Tracker visual del flujo de 8 pasos | `WorkflowTrackerComponent` |

## Estructura

```
src/app/
├── models/          # Interfaces TypeScript
├── services/        # DashboardService (HTTP + mock fallback)
└── components/
    ├── header/          # Título + botón refresh
    ├── sprint-stats/    # 4 cards de estadísticas
    ├── member-card/     # Card de miembro con tooltip
    ├── kanban-board/    # Board Kanban 5 columnas
    ├── break-timer/     # Timer 15 minutos
    └── workflow-tracker/ # Stepper 8 pasos
```

## Backend

El servicio intenta conectarse a `http://localhost:3000/api`. Si el backend no está disponible, usa datos mock automáticamente.

## Tema

Tema oscuro PrimeNG `lara-dark-blue` con variables CSS corporativas (`--corpo-*`).
