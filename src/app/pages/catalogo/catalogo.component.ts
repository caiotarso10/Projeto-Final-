import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'; // 1. Importação necessária para ler a URL
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
  private route = inject(ActivatedRoute); // 2. Injeção da rota ativa

  todosProdutos: any[] = [];      
  produtosExibidos: any[] = [];  
  marcasDisponiveis: string[] = [];
  marcaSelecionada: string = 'Todas';

  ngOnInit() {
    // Busca os dados através do Service
    this.produtoService.getProdutos().subscribe({
      next: (data) => {
        this.todosProdutos = data;
        this.produtosExibidos = data;

        // Extrai as marcas únicas da lista (usando Set para evitar duplicados)
        const marcas = this.todosProdutos.map(p => p.marca);
        this.marcasDisponiveis = ['Todas', ...new Set(marcas)];

        // 3. A MÁGICA: Escuta a URL após os produtos estarem carregados
        this.ouvirParametrosDaUrl();
      },
      error: (err) => {
        console.error('Erro ao buscar produtos:', err);
      }
    });
  }

  // Função auxiliar para monitorar a URL
  private ouvirParametrosDaUrl() {
    this.route.queryParams.subscribe(params => {
      const marcaUrl = params['marca'];

      if (marcaUrl) {
        // Função interna para limpar acentos, espaços e maiúsculas
        // Ex: "O Boticário" vira "oboticario" para bater certinho com o clique do carrossel
        const normalizar = (texto: string) => 
          texto.toLowerCase()
               .normalize("NFD")
               .replace(/[\u0300-\u036f]/g, "")
               .replace(/\s/g, '');

        // Procura se a marca da URL existe nas marcas que vieram da API
        const marcaEncontrada = this.marcasDisponiveis.find(
          marca => normalizar(marca) === normalizar(marcaUrl)
        );

        if (marcaEncontrada) {
          this.marcaSelecionada = marcaEncontrada; // Define a marca (ex: "O Boticário")
        } else {
          this.marcaSelecionada = 'Todas';
        }
      } else {
        this.marcaSelecionada = 'Todas';
      }

      // Aplica o filtro na tela
      this.filtrarPorMarca();
    });
  }

  // Sua lógica de filtro original (continua idêntica!)
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