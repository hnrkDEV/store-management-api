import { Test, TestingModule } from '@nestjs/testing';
import { VendaService } from './venda.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Venda } from './venda.entity';
import { Cliente } from '../cliente/cliente.entity';
import { Funcionario } from '../funcionario/funcionario.entity';
import { Produto } from '../produto/produto.entity';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('VendaService', () => {
  let service: VendaService;

  const mockVendaRepo = { create: jest.fn(), save: jest.fn(), find: jest.fn() };
  const mockClienteRepo = { findOne: jest.fn() };
  const mockFuncionarioRepo = { findOne: jest.fn() };
  const mockProdutoRepo = { findOne: jest.fn(), save: jest.fn() };

  const mockCliente = { id: 1, nome: 'João' };
  const mockFuncionario = { id: 1, nome: 'Felipe' };
  const mockProduto = { id: 1, nomeProduto: 'Mouse', estoque: 10 };
  const mockVenda = { id: 1, cliente: mockCliente, funcionario: mockFuncionario, produto: mockProduto, quantidade: 2 };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VendaService,
        { provide: getRepositoryToken(Venda), useValue: mockVendaRepo },
        { provide: getRepositoryToken(Cliente), useValue: mockClienteRepo },
        { provide: getRepositoryToken(Funcionario), useValue: mockFuncionarioRepo },
        { provide: getRepositoryToken(Produto), useValue: mockProdutoRepo },
      ],
    }).compile();

    service = module.get<VendaService>(VendaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar uma venda com sucesso', async () => {
    mockClienteRepo.findOne.mockResolvedValue(mockCliente);
    mockFuncionarioRepo.findOne.mockResolvedValue(mockFuncionario);
    mockProdutoRepo.findOne.mockResolvedValue({ ...mockProduto });
    mockProdutoRepo.save.mockResolvedValue({ ...mockProduto, estoque: 8 });
    mockVendaRepo.create.mockReturnValue(mockVenda);
    mockVendaRepo.save.mockResolvedValue(mockVenda);

    const result = await service.create({
      clienteId: 1,
      funcionarioId: 1,
      produtoId: 1,
      quantidade: 2,
    });

    expect(result).toEqual(mockVenda);
    expect(mockProdutoRepo.save).toHaveBeenCalledWith({ ...mockProduto, estoque: 8 });
  });

  it('deve lançar erro se cliente não for encontrado', async () => {
    mockClienteRepo.findOne.mockResolvedValue(null);

    await expect(service.create({
      clienteId: 1,
      funcionarioId: 1,
      produtoId: 1,
      quantidade: 1,
    })).rejects.toThrow(NotFoundException);
  });

  it('deve lançar erro se funcionário não for encontrado', async () => {
    mockClienteRepo.findOne.mockResolvedValue(mockCliente);
    mockFuncionarioRepo.findOne.mockResolvedValue(null);

    await expect(service.create({
      clienteId: 1,
      funcionarioId: 1,
      produtoId: 1,
      quantidade: 1,
    })).rejects.toThrow(NotFoundException);
  });

  it('deve lançar erro se produto não for encontrado', async () => {
    mockClienteRepo.findOne.mockResolvedValue(mockCliente);
    mockFuncionarioRepo.findOne.mockResolvedValue(mockFuncionario);
    mockProdutoRepo.findOne.mockResolvedValue(null);

    await expect(service.create({
      clienteId: 1,
      funcionarioId: 1,
      produtoId: 1,
      quantidade: 1,
    })).rejects.toThrow(NotFoundException);
  });

  it('deve lançar erro se o estoque for insuficiente', async () => {
    mockClienteRepo.findOne.mockResolvedValue(mockCliente);
    mockFuncionarioRepo.findOne.mockResolvedValue(mockFuncionario);
    mockProdutoRepo.findOne.mockResolvedValue({ ...mockProduto, estoque: 1 });

    await expect(service.create({
      clienteId: 1,
      funcionarioId: 1,
      produtoId: 1,
      quantidade: 2,
    })).rejects.toThrow(BadRequestException);
  });

  it('deve retornar todas as vendas', async () => {
    mockVendaRepo.find.mockResolvedValue([mockVenda]);

    const result = await service.findAll();
    expect(result).toEqual([mockVenda]);
    expect(mockVendaRepo.find).toHaveBeenCalledWith({ relations: ['cliente', 'funcionario', 'produto'] });
  });
});
