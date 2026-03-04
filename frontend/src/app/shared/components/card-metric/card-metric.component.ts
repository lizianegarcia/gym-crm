import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card-metric',
  template: `
    <mat-card class="card-metric">
      <mat-card-title>{{ title }}</mat-card-title>
      <mat-card-content>{{ value }}</mat-card-content>
    </mat-card>
  `,
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule]
})
export class CardMetricComponent {
  @Input() title: string = '';
  @Input() value: number = 0;
}
