import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: any[] = [];

  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  adicionar(produto: any) {
    const produtoExistente = this.items.find(item => item.id === produto.id);

    if (produtoExistente) {
      produtoExistente.quantidade = (produtoExistente.quantidade ?? 1) + 1;
    } else {
      this.items.push({
        ...produto,
        quantidade: produto.quantidade ?? 1
      });
    }

    this.cartCount.next(this.items.reduce((total, item) => total + (item.quantidade ?? 1), 0));
  }

  getItems() {
    return this.items;
  }

  getCartItems() {
    return this.getItems();
  }

  getSubtotal() {
    return this.items.reduce((total, item) => total + (item.preco * (item.quantidade ?? 1)), 0);
  }

  getItemCount() {
    return this.items.length;
  }

  clearCart() {
    this.items = [];
    this.cartCount.next(0);
  }
}