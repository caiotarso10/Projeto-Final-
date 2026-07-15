import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CartService } from '../../service/cart.service';
import { MenuComponent } from '../../components/menu/menu.component';

@Component({
  selector: 'app-compra',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, FooterComponent, MenuComponent],
  templateUrl: './compra.component.html',
  styleUrl: './compra.component.css'
})
export class CompraComponent implements OnInit {

isMenuOpen = false;

handleLogout(): void{}

  private cartService = inject(CartService);

  itensComprados: any[] = [];
  valorTotal: number = 0;
  
  
  compraSucesso: boolean = false; 

  ngOnInit() {
    this.itensComprados = this.cartService.getCartItems();
    this.calcularTotal();
  }

  calcularTotal() {
    this.valorTotal = this.itensComprados.reduce((total, item) => {
      const quantidade = item.quantidade ?? 1;
      return total + (item.preco * quantidade);
    }, 0);
  }

  finalizarCompra() {
    if (this.itensComprados.length === 0) return;

    console.log('🛍️ Compra realizada com sucesso!');
    console.log('📦 Itens comprados:', this.itensComprados);
    console.log('💰 Valor total da compra: R$', this.valorTotal);

    this.compraSucesso = true;
    this.cartService.clearCart();
    this.itensComprados = [];
    this.valorTotal = 0;
  }

  fecharPopup() {
    this.compraSucesso = false;
  }
}