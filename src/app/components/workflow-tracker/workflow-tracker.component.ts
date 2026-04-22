import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';

export interface WorkflowStep {
  id: number;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  status: 'completed' | 'active' | 'pending';
}

@Component({
  selector: 'app-workflow-tracker',
  standalone: true,
  imports: [CommonModule, CardModule, TooltipModule, TagModule],
  templateUrl: './workflow-tracker.component.html',
  styleUrls: ['./workflow-tracker.component.scss']
})
export class WorkflowTrackerComponent {
  readonly activeStep = signal<number>(4); // Paso 4 activo por defecto

  readonly steps: WorkflowStep[] = [
    {
      id: 0,
      name: 'Paso 0',
      shortName: 'Obtener HU',
      description: 'Obtener la Historia de Usuario desde Jira. Leer descripción completa y criterios de aceptación del changelog.',
      icon: 'pi-download',
      status: 'completed'
    },
    {
      id: 1,
      name: 'Paso 0.5',
      shortName: 'Reconocimiento',
      description: 'Explorar el proyecto completo. Leer ARCHITECTURE.md, archivos de config e infraestructura. Verificar cada C.A.',
      icon: 'pi-search',
      status: 'completed'
    },
    {
      id: 2,
      name: 'Paso 1',
      shortName: 'Análisis',
      description: 'Aplicar skill user-story-parser. Identificar actor, acción, beneficio, dependencias y casos borde.',
      icon: 'pi-file-edit',
      status: 'completed'
    },
    {
      id: 3,
      name: 'Paso 2',
      shortName: 'Plan de Cambios',
      description: 'Tabla de archivos a modificar con objetivo, justificación, riesgos y tests. Aplicar code-review y security-audit.',
      icon: 'pi-list-check',
      status: 'completed'
    },
    {
      id: 4,
      name: 'Paso 3',
      shortName: 'Autorización',
      description: 'Solicitar autorización explícita por cada archivo a modificar. NUNCA omitir este paso.',
      icon: 'pi-shield',
      status: 'active'
    },
    {
      id: 5,
      name: 'Paso 4',
      shortName: 'Implementación',
      description: 'Implementar cambios autorizados uno a uno. Mostrar diff después de cada cambio. Vista previa UI si aplica.',
      icon: 'pi-code',
      status: 'pending'
    },
    {
      id: 6,
      name: 'Paso 5',
      shortName: 'QA',
      description: 'Ejecutar tests existentes y nuevos. Validar cada C.A. con evidencia. Tabla de cumplimiento.',
      icon: 'pi-verified',
      status: 'pending'
    },
    {
      id: 7,
      name: 'Paso 6',
      shortName: 'PR + Jira',
      description: 'Crear rama feature/ desde develop. Commits Conventional Commits. PR a develop con pr-template. Actualizar Jira.',
      icon: 'pi-git-merge',
      status: 'pending'
    }
  ];

  setActiveStep(stepIndex: number): void {
    this.activeStep.set(stepIndex);
    this.steps.forEach((step, i) => {
      if (i < stepIndex) {
        step.status = 'completed';
      } else if (i === stepIndex) {
        step.status = 'active';
      } else {
        step.status = 'pending';
      }
    });
  }
}
