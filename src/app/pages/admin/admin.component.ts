import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from '../../service/produto.service';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MenuComponent } from '../../components/menu/menu.component';
import { AuthService } from '../../service/auth.service'; 

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent, MenuComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  private produtoService = inject(ProdutoService);
  private authService = inject(AuthService); 

 
  isMenuOpen = false;

  

  produtos: any[] = [];
  banners: any[] = []; 
  abaAtual: 'produtos' | 'carrossel' = 'produtos';

 
  produtoAtual: any = {
    nome: '',
    preco: null,
    marca: '',
    descricao: '', 
    imagem: '',
    quantidade: 1
  };
  
 
  novoBanner: any = {
    titulo: '',
    imagem: '',
    marca: '' 
  };

  modoEdicao: boolean = false;
  mensagem: string = '';

  ngOnInit() {
    this.carregarProdutos();
    this.carregarBanners(); 
  }

  // --- MÉTODOS DO MENU ---
  handleLogout() {
    this.authService.logout();
  }

  // --- MÉTODOS DE PRODUTOS ---
  carregarProdutos() {
    this.produtoService.getProdutos().subscribe({
      next: (data) => this.produtos = data,
      error: (err) => console.error('Erro ao carregar produtos', err)
    });
  }

  salvarProduto() {
    if (this.modoEdicao) {
      this.produtoService.atualizarProduto(this.produtoAtual.id, this.produtoAtual).subscribe(() => {
        this.mostrarMensagem('Produto atualizado com sucesso!');
        this.carregarProdutos();
        this.resetarFormulario();
      });
    } else {
      this.produtoService.adicionarProduto(this.produtoAtual).subscribe(() => {
        this.mostrarMensagem('Produto adicionado com sucesso!');
        this.carregarProdutos();
        this.resetarFormulario();
      });
    }
  }

  editarProduto(produto: any) {
    this.modoEdicao = true;
    this.produtoAtual = { ...produto };
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  excluirProduto(id: number) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      this.produtoService.deletarProduto(id).subscribe(() => {
        this.mostrarMensagem('Produto excluído com sucesso!');
        this.carregarProdutos();
      });
    }
  }

  resetarFormulario() {
    this.modoEdicao = false;
    // 👈 Atualizado para limpar a descrição também
    this.produtoAtual = { nome: '', preco: null, marca: '', descricao: '', imagem: '', quantidade: 1 };
  }

  // --- MÉTODOS DO CARROSSEL (BANNERS) ---
  carregarBanners() {
    this.produtoService.getBanners().subscribe({
      next: (data) => this.banners = data,
      error: (err) => console.error('Erro ao carregar banners', err)
    });
  }

  salvarBanner() {
    if (!this.novoBanner.imagem) return;

    this.produtoService.adicionarBanner(this.novoBanner).subscribe({
      next: () => {
        this.mostrarMensagem('Banner adicionado ao carrossel!');
        this.carregarBanners();
        this.novoBanner = { titulo: '', imagem: '', marca: '' }; // Reseta o form
      },
      error: (err) => console.error('Erro ao adicionar banner', err)
    });
  }

  excluirBanner(id: number) {
    if (confirm('Tem certeza que deseja remover este banner do carrossel?')) {
      this.produtoService.deletarBanner(id).subscribe({
        next: () => {
          this.mostrarMensagem('Banner removido com sucesso!');
          this.carregarBanners();
        },
        error: (err: any) => console.error('Erro ao deletar banner', err)
      });
    }
  }

 
  mostrarMensagem(msg: string) {
    this.mensagem = msg;
    setTimeout(() => this.mensagem = '', 3000);
  }

  mudarAba(aba: 'produtos' | 'carrossel') {
    this.abaAtual = aba;
  }
}