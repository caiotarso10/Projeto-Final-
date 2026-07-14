import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrl = "http://localhost:3000/produtos"; 

  constructor(private http: HttpClient) { }

getProdutosDestaque(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => {
        if (response.produtos) {
          return response.produtos.slice(0, 3);
        }
     
        return response.slice(0, 3);
      }) 
    );
  }
}
