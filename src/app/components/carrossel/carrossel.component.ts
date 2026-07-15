import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; // 👈 Importação necessária para o clique funcionar!
 
declare var bootstrap: any;
 
@Component({
  selector: 'app-carrossel',
  imports: [CommonModule, RouterLink], // 👈 Adicionado no array de imports
  templateUrl: './carrossel.component.html',
  styleUrl: './carrossel.component.css'
})
export class CarrosselComponent implements AfterViewInit {
  @ViewChild('carouselRef') carouselRef!: ElementRef;
 
  ngAfterViewInit(): void {
    new bootstrap.Carousel(this.carouselRef.nativeElement, {
      interval: 2000,
      ride: 'carousel',
      wrap: true,
      touch: true
    });
  }
}