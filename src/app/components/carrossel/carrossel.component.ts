import { Component, ElementRef, ViewChild, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProdutoService } from '../../service/produto.service';

declare var bootstrap: any;

@Component({
  selector: 'app-carrossel',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './carrossel.component.html',
  styleUrl: './carrossel.component.css'
})
export class CarrosselComponent implements OnInit, OnDestroy {
  @ViewChild('carouselRef') carouselRef!: ElementRef;
  private produtoService = inject(ProdutoService);
  
  banners: any[] = [];
  private carouselInstance: any;

  ngOnInit(): void {
    this.produtoService.getBanners().subscribe({
      next: (dados) => {
        this.banners = dados;
        
        if (this.banners.length > 0) {
          setTimeout(() => {
            // Se já existir uma instância, destrói antes de criar outra
            if (this.carouselInstance) {
              this.carouselInstance.dispose();
            }

            this.carouselInstance = new bootstrap.Carousel(this.carouselRef.nativeElement, {
              interval: 3000,
              ride: 'carousel',
              wrap: true,        // garante o loop infinito
              touch: true,
              pause: false       // 👈 A CORREÇÃO PRINCIPAL: nunca pausa no hover
            });
          }, 100);
        }
      },
      error: (erro) => console.error('Erro ao carregar os banners:', erro)
    });
  }

  ngOnDestroy(): void {
    // Limpa a instância ao sair da página, evitando vazamento de memória
    if (this.carouselInstance) {
      this.carouselInstance.dispose();
    }
  }
}