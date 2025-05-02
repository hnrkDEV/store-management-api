-- a tabela dos Clientes
CREATE TABLE clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  cpf VARCHAR(14) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL
);

-- a tabela de Funcionários
CREATE TABLE funcionarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  dataCriacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- a tabela dos Produtos
CREATE TABLE produtos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nomeProduto VARCHAR(255) NOT NULL,
  dataCriacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  estoque INT NOT NULL,
  valor DECIMAL(10, 2) NOT NULL
);

-- a tabela das Vendas
CREATE TABLE vendas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  clienteId INT NOT NULL,
  funcionarioId INT NOT NULL,
  produtoId INT NOT NULL,
  quantidade INT NOT NULL,
  dataVenda TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (clienteId) REFERENCES clientes(id),
  FOREIGN KEY (funcionarioId) REFERENCES funcionarios(id),
  FOREIGN KEY (produtoId) REFERENCES produtos(id)
);
