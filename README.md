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
├── config/
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

Crie um banco chamado `store_db`

### 3. Inicie o projeto
```bash
npm run start
```

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
- `POST /vendas` - realiza uma venda e as baixas do estoque
- `GET /vendas` - lista todas as vendas com os relacionamentos

---

## Observações:

- Toda a lógica de negócio está centralizada nos services.
- Os logs de criação de vendas, estoques e erros podem ser consultados via terminal ou no arquivo `logs/app.log`.

---

## Documentação via Swagger

A documentação interativa da API foi adicionada com Swagger, permitindo testes diretos dos endpoints via navegador.

Acesse:

```
http://localhost:3000/api
```

---

## Testes automatizados

Foram implementados testes unitários com Jest nos services dos seguintes módulos:

- Cliente
- Funcionário
- Produto
- Venda

Os testes cobrem os principais fluxos de criação, busca, atualização, exclusão e cenários de erro.

Para executar:

```bash
npm run test
```

---

João Henrique  
Projeto feito como parte de um desafio técnico.
