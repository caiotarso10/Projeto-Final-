import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'; 
import { CardHomeComponent } from '../../components/card-home/card-home.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProdutoService } from '../../service/produto.service';
import { MenuComponent } from '../../components/menu/menu.component';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule, CardHomeComponent, HeaderComponent, FooterComponent, MenuComponent],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent implements OnInit {
  isMenuOpen = false;

  handleLogout(): void {}

  private produtoService = inject(ProdutoService);
  private route = inject(ActivatedRoute); 

  todosProdutos: any[] = [];      
  produtosExibidos: any[] = [];  
  marcasDisponiveis: string[] = [];
  marcaSelecionada: string = 'Todas';

  ngOnInit() {
    
    this.produtoService.getProdutos().subscribe({
      next: (data) => {
        this.todosProdutos = data;
        this.produtosExibidos = data;

       
        const marcas = this.todosProdutos.map(p => p.marca);
        this.marcasDisponiveis = ['Todas', ...new Set(marcas)];

  
        this.ouvirParametrosDaUrl();
      },
      error: (err) => {
        console.error('Erro ao buscar produtos:', err);
      }
    });
  }

  
  private ouvirParametrosDaUrl() {
    this.route.queryParams.subscribe(params => {
      const marcaUrl = params['marca'];

      if (marcaUrl) {
     
        const normalizar = (texto: string) => 
          texto.toLowerCase()
               .normalize("NFD")
               .replace(/[\u0300-\u036f]/g, "")
               .replace(/\s/g, '');


        const marcaEncontrada = this.marcasDisponiveis.find(
          marca => normalizar(marca) === normalizar(marcaUrl)
        );

        if (marcaEncontrada) {
          this.marcaSelecionada = marcaEncontrada;
        } else {
          this.marcaSelecionada = 'Todas';
        }
      } else {
        this.marcaSelecionada = 'Todas';
      }

      
      this.filtrarPorMarca();
    });
  }

  
  filtrarPorMarca() {
    if (this.marcaSelecionada === 'Todas') {
      this.produtosExibidos = this.todosProdutos;
    } else {
      this.produtosExibidos = this.todosProdutos.filter(
        produto => produto.marca === this.marcaSelecionada
      );
    }
  }
}