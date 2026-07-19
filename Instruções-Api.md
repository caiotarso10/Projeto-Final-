# L.D.essence — Como rodar o projeto

Este projeto utiliza o [json-server](https://github.com/typicode/json-server) para simular uma API REST durante o desenvolvimento. Por isso, é necessário rodar **dois processos separados**: o Angular e o json-server.

## Pré-requisitos

- Node.js instalado
- Angular CLI instalado (`npm install -g @angular/cli`)

## 1. Instalar as dependências

```bash
npm install
```

## 2. Rodar o json-server (API)

O arquivo do banco de dados fica em `db.json` na raiz do projeto.

Se ainda não tiver o json-server instalado globalmente, instale:

```bash
npm install -g json-server
```

Depois, rode:

```bash
json-server --watch db.json --port 3001
```

A API vai ficar disponível em `http://localhost:3001`, com as rotas:
- `http://localhost:3000/produtos`
- `http://localhost:3000/banners`

> ⚠️ Mantenha este terminal aberto enquanto usa a aplicação. Sem ele, o catálogo, o carrossel e o painel administrativo não vão carregar dados.

## 3. Rodar o Angular (em outro terminal)

```bash
ng serve
```

Acesse em `http://localhost:4200`.

## Acesso ao Painel Administrativo

Para acessar o painel de administração:
1. Crie uma conta na tela de cadastro usando o e-mail configurado como administrador.
2. Faça login normalmente — você será redirecionado automaticamente para `/admin`.
