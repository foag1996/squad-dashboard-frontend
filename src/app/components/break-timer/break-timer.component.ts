import { Component, OnDestroy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-break-timer',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, ProgressBarModule, BadgeModule],
  templateUrl: './break-timer.component.html',
  styleUrls: ['./break-timer.component.scss']
})
export class BreakTimerComponent implements OnDestroy {
  private readonly TOTAL_SECONDS = 15 * 60; // 15 minutos
  private intervalId: ReturnType<typeof setInterval> | null = null;

  readonly secondsLeft = signal<number>(this.TOTAL_SECONDS);
  readonly isRunning = signal<boolean>(false);
  readonly isFinished = signal<boolean>(false);

  readonly progressValue = computed(() =>
    Math.round(((this.TOTAL_SECONDS - this.secondsLeft()) / this.TOTAL_SECONDS) * 100)
  );

  readonly displayTime = computed(() => {
    const s = this.secondsLeft();
    const minutes = Math.floor(s / 60);
    const seconds = s % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  });

  start(): void {
    if (this.isRunning() || this.isFinished()) return;
    this.isRunning.set(true);
    this.intervalId = setInterval(() => {
      const current = this.secondsLeft();
      if (current <= 1) {
        this.secondsLeft.set(0);
        this.isRunning.set(false);
        this.isFinished.set(true);
        this.clearInterval();
        this.playAlertSound();
      } else {
        this.secondsLeft.set(current - 1);
      }
    }, 1000);
  }

  pause(): void {
    if (!this.isRunning()) return;
    this.isRunning.set(false);
    this.clearInterval();
  }

  reset(): void {
    this.clearInterval();
    this.secondsLeft.set(this.TOTAL_SECONDS);
    this.isRunning.set(false);
    this.isFinished.set(false);
  }

  private clearInterval(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private playAlertSound(): void {
    try {
      const ctx = new AudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(880, ctx.currentTime);
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 1.5);
    } catch {
      // AudioContext no disponible en todos los entornos
    }
  }

  ngOnDestroy(): void {
    this.clearInterval();
  }
}
