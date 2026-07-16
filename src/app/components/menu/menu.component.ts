import { Component, ElementRef, EventEmitter, OnDestroy, AfterViewInit, Output, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service'; // Certifique-se de que o caminho até o seu serviço está correto!

declare var bootstrap: any;

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements AfterViewInit, OnDestroy {
  // 👉 Injetamos o AuthService de forma pública para o menu.component.html usá-lo no *ngIf
  public authService = inject(AuthService);

  @ViewChild('menuOffcanvas') menuOffcanvasRef!: ElementRef;

  @Output() openChange = new EventEmitter<boolean>();

  private offcanvasInstance: any;

  private onShow = () => this.openChange.emit(true);
  private onHide = () => this.openChange.emit(false);

  private getInstance(): any {
    if (!this.offcanvasInstance) {
      this.offcanvasInstance = new bootstrap.Offcanvas(this.menuOffcanvasRef.nativeElement);
    }
    return this.offcanvasInstance;
  }

  ngAfterViewInit(): void {
    const el = this.menuOffcanvasRef.nativeElement;
    el.addEventListener('shown.bs.offcanvas', this.onShow);
    el.addEventListener('hidden.bs.offcanvas', this.onHide);
  }

  ngOnDestroy(): void {
    const el = this.menuOffcanvasRef?.nativeElement;
    if (el) {
      el.removeEventListener('shown.bs.offcanvas', this.onShow);
      el.removeEventListener('hidden.bs.offcanvas', this.onHide);
    }
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