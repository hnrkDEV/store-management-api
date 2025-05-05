import { Test, TestingModule } from '@nestjs/testing';
import { ClienteService } from './cliente.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cliente } from './cliente.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('ClienteService', () => {
  let service: ClienteService;
  let repo: Repository<Cliente>;

  const mockClienteRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    update: jest.fn()
  };

  const mockCliente = {
    id: 1,
    nome: 'João Henrique',
    email: 'joao@example.com',
    cpf: '12345678900',
    senha: 'senha123',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClienteService,
        {
          provide: getRepositoryToken(Cliente),
          useValue: mockClienteRepository,
        },
      ],
    }).compile();

    service = module.get<ClienteService>(ClienteService);
    repo = module.get<Repository<Cliente>>(getRepositoryToken(Cliente));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar um cliente', async () => {
    mockClienteRepository.create.mockReturnValue(mockCliente);
    mockClienteRepository.save.mockResolvedValue(mockCliente);

    const result = await service.create(mockCliente as any);
    expect(result).toEqual(mockCliente);
    expect(mockClienteRepository.create).toHaveBeenCalledWith(mockCliente);
    expect(mockClienteRepository.save).toHaveBeenCalledWith(mockCliente);
  });

  it('deve listar todos os clientes', async () => {
    mockClienteRepository.find.mockResolvedValue([mockCliente]);

    const result = await service.findAll();
    expect(result).toEqual([mockCliente]);
  });

  it('deve retornar um cliente por ID', async () => {
    mockClienteRepository.findOne.mockResolvedValue(mockCliente);

    const result = await service.findOne(1);
    expect(result).toEqual(mockCliente);
  });

  it('deve lançar erro se o cliente não for encontrado', async () => {
    mockClienteRepository.findOne.mockResolvedValue(null);

    await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
  });

  it('deve atualizar um cliente existente', async () => {
    mockClienteRepository.findOne.mockResolvedValue({ ...mockCliente, nome: 'Atualizado' });
    mockClienteRepository.update.mockResolvedValue({ affected: 1 });
  
    const result = await service.update(1, { nome: 'Atualizado' } as any);
    expect(result.nome).toBe('Atualizado');
  });
  

  it('deve deletar um cliente existente', async () => {
    mockClienteRepository.findOne.mockResolvedValue(mockCliente);
    mockClienteRepository.delete.mockResolvedValue({ affected: 1 });

    await service.remove(1);
    expect(mockClienteRepository.delete).toHaveBeenCalledWith(1);
  });
});
