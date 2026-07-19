import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  nome = '';
  email = '';
  senha = '';
  aceitouLGPD = false; 

  erroMensagem = '';
  sucessoMensagem = '';

  onSubmit() {
    if (!this.nome || !this.email || !this.senha) {
      this.erroMensagem = 'Por favor, preencha todos os campos.';
      return;
    }

    if (!this.aceitouLGPD) {
      this.erroMensagem = 'Você precisa aceitar os termos da LGPD para continuar.';
      return;
    }

    const novoUsuario = {
      nome: this.nome,
      email: this.email,
      senha: this.senha
    };

    const cadastrado = this.authService.cadastrar(novoUsuario);

    if (cadastrado) {
      this.sucessoMensagem = 'Cadastro realizado com sucesso! Redirecionando para o login...';
      this.erroMensagem = '';
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    } else {
      this.erroMensagem = 'Este e-mail já está cadastrado.';
      this.sucessoMensagem = '';
    }
  }
}
