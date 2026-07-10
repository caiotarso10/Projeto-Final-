import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  @ViewChild('menuOffcanvas') menuOffcanvasRef!: ElementRef;

  private offcanvasInstance: any;

  private getInstance(): any {
    if (!this.offcanvasInstance) {
      this.offcanvasInstance = new bootstrap.Offcanvas(this.menuOffcanvasRef.nativeElement);
    }
    return this.offcanvasInstance;
  }

  toggle(): void {
    this.getInstance().toggle();
  }

  open(): void {
    this.getInstance().show();
  }

  close(): void {
    this.getInstance().hide();
  }
}