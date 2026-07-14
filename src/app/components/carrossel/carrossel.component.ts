
import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
 
declare var bootstrap: any;
 
@Component({
  selector: 'app-carrossel',
  imports: [CommonModule],
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
 