import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necessário para usar o *ngFor
import { HeaderComponent } from '../../components/header/header.component';
import { MenuComponent } from '../../components/menu/menu.component';
import { CarrosselComponent } from '../../components/carrossel/carrossel.component';
import { CardHomeComponent } from '../../components/card-home/card-home.component'; // Importe o Card
import { ProdutoService } from '../../services/produtos/produto.service'; // Importe o Serviço

@Component({
  selector: 'app-home',
  standalone: true,
  
  imports: [CommonModule, HeaderComponent, MenuComponent, CarrosselComponent, CardHomeComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isMenuOpen = false;
  produtosMaisVendidos: any[] = []; 

  constructor(private produtoService: ProdutoService) {}


  ngOnInit(): void {
    this.produtoService.getProdutosDestaque().subscribe({
      next: (dados) => {
        this.produtosMaisVendidos = dados;
      },
      error: (erro) => {
        console.error('Erro ao buscar os produtos', erro);
      }
    });
  }

  handleLogout(): void {

  }
}