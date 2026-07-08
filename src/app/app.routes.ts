import { Routes } from '@angular/router';


export const routes: Routes = [
{
    path: "",
    pathMatch: "full",
    loadComponent:() => {
    return import("./pages/login/login.component")
    .then(c => c.LoginComponent)
    }
},

{
    path: "cadastro",
    pathMatch: "full",
    loadComponent:() => {
    return import("./pages/cadastro/cadastro.component")
    .then(c => c.CadastroComponent)
    }
},
{
    path: "catalogo",
    pathMatch: "full",
    loadComponent:() => {
    return import("./pages/catalogo/catalogo.component")
    .then(c => c.CatalogoComponent)
    }
},

{
    path: "home",
    pathMatch: "full",
    loadComponent:() => {
    return import("./pages/home/home.component")
    .then(c => c.HomeComponent)
    }

},

{
    path: "compra",
    pathMatch: "full",
    loadComponent:() => {
    return import("./pages/compra/compra.component")
    .then(c => c.CompraComponent)
    }
}

];
