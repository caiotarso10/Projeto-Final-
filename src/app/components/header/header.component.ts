import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() menuToggle = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  menuOpen = false;

  onMenuClick(): void {
    this.menuOpen = !this.menuOpen;
    this.menuToggle.emit();
  }

  onLogoutClick(): void {
    this.logout.emit();
  }
}