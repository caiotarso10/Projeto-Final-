import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { HeaderComponent } from '../../components/header/header.component';
import { MenuComponent } from '../../components/menu/menu.component';
import { CarrosselComponent } from '../../components/carrossel/carrossel.component';
import { CardHomeComponent } from '../../components/card-home/card-home.component'; 
import { FooterComponent } from '../../components/footer/footer.component';
import { ProdutoService } from '../../service/produto.service';

@Component({
  selector: 'app-home',
  standalone: true,
  
  imports: [CommonModule, HeaderComponent, MenuComponent, CarrosselComponent, CardHomeComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isMenuOpen = false;
  produtosMaisVendidos: any[] = []; 

  constructor(private produtoService: ProdutoService) {}


 ngOnInit(): void {
    this.produtoService.getProdutos().subscribe({
      next: (dados) => {
        
        this.produtosMaisVendidos = dados.slice(0, 3);
      },
      error: (erro) => {
        console.error('Erro ao buscar os produtos', erro);
      }
    });
  }

  handleLogout(): void {

  }
}