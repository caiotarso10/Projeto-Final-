import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; 
import { CartService } from '../../service/cart.service'; 
import { AuthService } from '../../service/auth.service'; // 1. Importe o AuthService

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() menuOpen = false;

  @Output() menuToggle = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  private cartService = inject(CartService);
  private authService = inject(AuthService); // 2. Injete o serviço aqui
  
  itemCount: number = 0;

  ngOnInit() {
    this.itemCount = this.cartService.getItemCount();

    this.cartService.cartCount$.subscribe(count => {
      this.itemCount = count;
    });
  }

  onMenuClick(): void {
    this.menuToggle.emit();
  }

  onLogoutClick(): void {
    // 3. Chame a função que limpa o armazenamento e redireciona a rota
    this.authService.logout();
    
    // Mantemos o seu emit para caso o componente pai precise saber que o logout ocorreu
    this.logout.emit();
  }
}