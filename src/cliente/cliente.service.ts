import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepo: Repository<Cliente>,
  ) {}

  async create(data: CreateClienteDto): Promise<Cliente> {
    const cliente = this.clienteRepo.create(data);
    return this.clienteRepo.save(cliente);
  }

  async findAll(): Promise<Cliente[]> {
    return this.clienteRepo.find();
  }

  async findOne(id: number): Promise<Cliente> {
  const cliente = await this.clienteRepo.findOne({ where: { id } });

  if (!cliente) {
    throw new NotFoundException('Cliente não encontrado');
  }

  return cliente;
  }

  async update(id: number, data: Partial<CreateClienteDto>): Promise<Cliente> {
    await this.clienteRepo.update(id, data);
    const updated = await this.clienteRepo.findOne({ where: { id } });
  
    if (!updated) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado`);
    }
  
    return updated;
  }

  async remove(id: number): Promise<void> {
    await this.clienteRepo.delete(id);
  }
}
