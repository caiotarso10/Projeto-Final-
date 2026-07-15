import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  
  private apiUrl = 'http://localhost:3000/produtos'; 

  constructor(private http: HttpClient) {}


  getProdutos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}