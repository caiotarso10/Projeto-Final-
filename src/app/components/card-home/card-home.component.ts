import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importante para o pipe de moeda (| currency) funcionar

@Component({
  selector: 'app-card-home',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './card-home.component.html',
  styleUrls: ['./card-home.component.css']
})
export class CardHomeComponent {
  @Input() produto: any;
}