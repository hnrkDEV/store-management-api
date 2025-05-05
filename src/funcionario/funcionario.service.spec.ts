import { Test, TestingModule } from '@nestjs/testing';
import { FuncionarioService } from './funcionario.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Funcionario } from './funcionario.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('FuncionarioService', () => {
  let service: FuncionarioService;
  let repo: Repository<Funcionario>;

  const mockFuncionarioRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  };

  const mockFuncionario = {
    id: 1,
    nome: 'Felipe',
    email: 'felipe@Cattavento.com.br',
    senha: '123456',
    criadoEm: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FuncionarioService,
        {
          provide: getRepositoryToken(Funcionario),
          useValue: mockFuncionarioRepository,
        },
      ],
    }).compile();

    service = module.get<FuncionarioService>(FuncionarioService);
    repo = module.get<Repository<Funcionario>>(getRepositoryToken(Funcionario));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar um funcionário', async () => {
    mockFuncionarioRepository.create.mockReturnValue(mockFuncionario);
    mockFuncionarioRepository.save.mockResolvedValue(mockFuncionario);

    const result = await service.create(mockFuncionario as any);
    expect(result).toEqual(mockFuncionario);
  });

  it('deve listar todos os funcionários', async () => {
    mockFuncionarioRepository.find.mockResolvedValue([mockFuncionario]);

    const result = await service.findAll();
    expect(result).toEqual([mockFuncionario]);
  });

  it('deve retornar um funcionário por ID', async () => {
    mockFuncionarioRepository.findOne.mockResolvedValue(mockFuncionario);

    const result = await service.findOne(1);
    expect(result).toEqual(mockFuncionario);
  });

  it('deve lançar erro se o funcionário não for encontrado', async () => {
    mockFuncionarioRepository.findOne.mockResolvedValue(null);

    await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
  });

  it('deve atualizar um funcionário existente', async () => {
    mockFuncionarioRepository.update.mockResolvedValue({ affected: 1 });
    mockFuncionarioRepository.findOne.mockResolvedValue({ ...mockFuncionario, nome: 'Atualizado' });

    const result = await service.update(1, { nome: 'Atualizado' } as any);
    expect(result.nome).toBe('Atualizado');
  });

  it('deve deletar um funcionário existente', async () => {
    mockFuncionarioRepository.findOne.mockResolvedValue(mockFuncionario);
    mockFuncionarioRepository.delete.mockResolvedValue({ affected: 1 });

    await service.remove(1);
    expect(mockFuncionarioRepository.delete).toHaveBeenCalledWith(1);
  });
});
