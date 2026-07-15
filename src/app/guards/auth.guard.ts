import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true; // Acesso liberado!
  } else {
    // Se não estiver logado, redireciona para o login e salva a rota que ele tentou entrar
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
};
