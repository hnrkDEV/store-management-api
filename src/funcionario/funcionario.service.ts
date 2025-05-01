import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Funcionario } from './funcionario.entity';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';

@Injectable()
export class FuncionarioService {
  constructor(
    @InjectRepository(Funcionario)
    private readonly funcionarioRepo: Repository<Funcionario>,
  ) {}

  async create(data: CreateFuncionarioDto): Promise<Funcionario> {
    const funcionario = this.funcionarioRepo.create(data);
    return this.funcionarioRepo.save(funcionario);
  }

  async findAll(): Promise<Funcionario[]> {
    return this.funcionarioRepo.find();
  }

  async findOne(id: number): Promise<Funcionario> {
    const funcionario = await this.funcionarioRepo.findOne({ where: { id } });
    if (!funcionario) {
      throw new NotFoundException(`Funcionário com ID ${id} não encontrado`);
    }
    return funcionario;
  }

  async update(id: number, data: Partial<CreateFuncionarioDto>): Promise<Funcionario> {
    await this.funcionarioRepo.update(id, data);
    const updated = await this.funcionarioRepo.findOne({ where: { id } });
    if (!updated) {
      throw new NotFoundException(`Funcionário com ID ${id} não encontrado`);
    }
    return updated;
  }

  async remove(id: number): Promise<void> {
    const result = await this.funcionarioRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Funcionário com ID ${id} não encontrado`);
    }
  }
}
