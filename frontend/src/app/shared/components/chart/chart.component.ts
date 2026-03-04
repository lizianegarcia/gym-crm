import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor, NgIf } from '@angular/common'; // se precisar para *ngFor/*ngIf

@Component({
  selector: 'app-chart',
  template: `
    <div *ngIf="data && objectKeys(data).length">
      <h3>{{ title }}</h3>
      <ul>
        <li *ngFor="let key of objectKeys(data)">
          {{ key }}: {{ data[key] }}
        </li>
      </ul>
    </div>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class ChartComponent {
  @Input() data: any;
  @Input() title: string = '';

  objectKeys(obj: any) {
    return Object.keys(obj);
  }
}
