# Store Management API

API desenvolvida para um desafio técnico de vaga de estágio.  
O objetivo foi construir uma api simples para o gerenciamento de uma loja fictícia, incluindo cadastro de clientes, funcionários, produtos e registro de vendas, com baixa automática no estoque.

---

## Tecnologias utilizadas:

- NestJS – estrutura principal da API
- TypeORM – ORM para manipulação do banco
- MySQL – banco de dados relacional
- Winston – logs estruturados

---

## As funcionalidades:

- CRUD de clientes
- CRUD de funcionários
- CRUD de produtos
- Registro de vendas (relacionando cliente, funcionário e produto)
- Atualização automática do estoque após cada venda
- Logs via Winston

---

## A estrutura do projeto:

```
src/
├── cliente/
├── funcionario/
├── produto/
├── venda/
├── app.module.ts
├── main.ts
```

Cada módulo tem seu próprio controller, service, entity e DTO.

---

##  Como rodar o projeto

### 1. Instale as dependências
```bash
npm install
```

### 2. Configure o banco de dados MySQL

Crie um banco chamado `store_db` e certifique-se de que o MySQL está rodando localmente.

> Se preferir, você pode usar Docker ou XAMPP.

### 3. Configure o `.env`

Crie um arquivo `.env` na raiz do projeto:

```
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_NAME=store_db
```

### 4. Inicie o projeto
```bash
npm run start:dev
```

---

## Script das tabelas

Se quiser criar as tabelas manualmente, tem o arquivo disponibilizado:

`script_tabelas.sql`

---

## Rotas principais:

### Clientes
- `POST /clientes`
- `GET /clientes`
- `GET /clientes/:id`
- `PUT /clientes/:id`
- `DELETE /clientes/:id`

### Funcionários
- `POST /funcionarios`
- `GET /funcionarios`
- `GET /funcionarios/:id`
- `PUT /funcionarios/:id`
- `DELETE /funcionarios/:id`

### Produtos
- `POST /produtos`
- `GET /produtos`
- `GET /produtos/:id`
- `PUT /produtos/:id`
- `DELETE /produtos/:id`

### Vendas
- `POST /vendas` - realiza uma venda e baixa o estoque
- `GET /vendas` - lista todas as vendas com os relacionamentos

---

## Observações:

- O projeto não inclui testes automatizados por não serem exigidos no desafio.
- Toda a lógica de negócio está centralizada nos services.
- Os logs de criação de vendas, estoques e erros podem ser consultados via terminal ou no arquivo `logs/app.log`.

---
João Henrique  
Projeto feito como parte de um desafio técnico.  
