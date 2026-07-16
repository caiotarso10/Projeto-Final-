import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  email = "";
  senha = "";
  erroMensagem = "";

  onSubmit() {
    if (!this.email || !this.senha) {
      this.erroMensagem = 'Por favor, preencha todos os campos.';
      return;
    }

    const logado = this.authService.login(this.email, this.senha);

    if (logado) {
      this.erroMensagem = '';
      
      if (this.authService.isAdmin()) {
        
        this.router.navigate(['/admin']);
        
      } else {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || "home";
        
        this.router.navigateByUrl(returnUrl);
      }

    } else {
      this.erroMensagem = 'E-mail ou senha inválidos. Por favor, cadastre-se se for seu primeiro acesso.';
    }
  }
}