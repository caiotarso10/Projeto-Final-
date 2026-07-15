import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);

  // Busca a lista de usuários salvos no navegador (mock de banco de dados)
  private getUsuarios(): any[] {
    const users = localStorage.getItem('ld_users');
    return users ? JSON.parse(users) : [];
  }

  // Tenta cadastrar o usuário. Retorna falso se o e-mail já existir
  cadastrar(usuario: any): boolean {
    const usuarios = this.getUsuarios();
    const usuarioExistente = usuarios.find(u => u.email === usuario.email);
    
    if (usuarioExistente) {
      return false; 
    }

    usuarios.push(usuario);
    localStorage.setItem('ld_users', JSON.stringify(usuarios));
    return true;
  }

  // Tenta realizar o login comparando e-mail e senha
  login(email: string, senha: string): boolean {
    const usuarios = this.getUsuarios();
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);
    
    if (usuario) {
      localStorage.setItem('ld_logged_in', 'true');
      localStorage.setItem('ld_current_user', JSON.stringify(usuario));
      return true;
    }
    return false;
  }

  // Retorna se o usuário está logado no momento
  isLoggedIn(): boolean {
    return localStorage.getItem('ld_logged_in') === 'true';
  }

  logout() {
    localStorage.removeItem('ld_logged_in');
    localStorage.removeItem('ld_current_user');
    this.router.navigate(['/']);
  }
}