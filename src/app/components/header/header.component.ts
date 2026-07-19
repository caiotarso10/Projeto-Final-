import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; 
import { CartService } from '../../service/cart.service'; 
import { AuthService } from '../../service/auth.service'; 

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
  private authService = inject(AuthService); 
  
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
    
    this.authService.logout();
    
    
    this.logout.emit();
  }
}