import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private http = inject(HttpClient);
  
  private apiUrl = 'http://localhost:3000/produtos';
  private urlBanners = 'http://localhost:3000/banners'; // Criamos uma variável para facilitar

  // --- MÉTODOS DE PRODUTOS ---

  getProdutos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  adicionarProduto(produto: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, produto);
  }

  atualizarProduto(id: number, produto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, produto);
  }

  deletarProduto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // --- MÉTODOS DE BANNERS (CARROSSEL) ---

  getBanners(): Observable<any[]> {
    return this.http.get<any[]>(this.urlBanners);
  }

  // 👇 Os dois métodos que estavam faltando! 👇
  adicionarBanner(banner: any): Observable<any> {
    return this.http.post<any>(this.urlBanners, banner);
  }

  deletarBanner(id: number): Observable<any> {
    return this.http.delete<any>(`${this.urlBanners}/${id}`);
  }
}