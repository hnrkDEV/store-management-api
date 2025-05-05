import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoService } from './produto.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Produto } from './produto.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('ProdutoService', () => {
  let service: ProdutoService;
  let repo: Repository<Produto>;

  const mockProdutoRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  };

  const mockProduto = {
    id: 1,
    nome: 'PC Gamer ultra mega blaster high end',
    valor: 2999.99,
    estoque: 10,
    criadoEm: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProdutoService,
        {
          provide: getRepositoryToken(Produto),
          useValue: mockProdutoRepository,
        },
      ],
    }).compile();

    service = module.get<ProdutoService>(ProdutoService);
    repo = module.get<Repository<Produto>>(getRepositoryToken(Produto));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar um produto', async () => {
    mockProdutoRepository.create.mockReturnValue(mockProduto);
    mockProdutoRepository.save.mockResolvedValue(mockProduto);

    const result = await service.create(mockProduto as any);
    expect(result).toEqual(mockProduto);
  });

  it('deve listar todos os produtos', async () => {
    mockProdutoRepository.find.mockResolvedValue([mockProduto]);

    const result = await service.findAll();
    expect(result).toEqual([mockProduto]);
  });

  it('deve retornar um produto por ID', async () => {
    mockProdutoRepository.findOne.mockResolvedValue(mockProduto);

    const result = await service.findOne(1);
    expect(result).toEqual(mockProduto);
  });

  it('deve lançar erro se o produto não for encontrado', async () => {
    mockProdutoRepository.findOne.mockResolvedValue(null);

    await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
  });

  it('deve atualizar um produto existente', async () => {
    mockProdutoRepository.update.mockResolvedValue({ affected: 1 });
    mockProdutoRepository.findOne.mockResolvedValue({ ...mockProduto, nomeProduto: 'Atualizado' });

    const result = await service.update(1, { nome: 'Atualizado' } as any);
    expect(result.nomeProduto).toBe('Atualizado');
  });

  it('deve deletar um produto existente', async () => {
    mockProdutoRepository.findOne.mockResolvedValue(mockProduto);
    mockProdutoRepository.delete.mockResolvedValue({ affected: 1 });

    await service.remove(1);
    expect(mockProdutoRepository.delete).toHaveBeenCalledWith(1);
  });
});
