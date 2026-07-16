import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard'; 
export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    loadComponent: () => {
      return import("./pages/login/login.component")
        .then(c => c.LoginComponent)
    }
  },
  {
    path: "cadastro",
    pathMatch: "full",
    loadComponent: () => {
      return import("./pages/cadastro/cadastro.component")
        .then(c => c.CadastroComponent)
    }
  },
  {
    path: "catalogo",
    pathMatch: "full",
    loadComponent: () => {
      return import("./pages/catalogo/catalogo.component")
        .then(c => c.CatalogoComponent)
    }
  },
  {
    path: "home",
    pathMatch: "full",
    loadComponent: () => {
      return import("./pages/home/home.component")
        .then(c => c.HomeComponent)
    }
  },
  {
    path: "compra",
    pathMatch: "full",
    canActivate: [authGuard], 
    loadComponent: () => {
      return import("./pages/compra/compra.component")
        .then(c => c.CompraComponent)
    }
  },
  {
    path: "admin",
    canActivate: [authGuard, adminGuard],
    loadComponent: () => {
      return import("./pages/admin/admin.component")
        .then(c => c.AdminComponent)
    }
  },
  {
   
    path: "**",
    redirectTo: ""
  }
];