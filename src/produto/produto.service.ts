import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from './produto.entity';
import { CreateProdutoDto } from './dto/create-produto.dto';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepo: Repository<Produto>,
  ) {}

  async create(data: CreateProdutoDto): Promise<Produto> {
    const novo = this.produtoRepo.create(data);
    return this.produtoRepo.save(novo);
  }

  async findAll(): Promise<Produto[]> {
    return this.produtoRepo.find();
  }

  async findOne(id: number): Promise<Produto> {
    const produto = await this.produtoRepo.findOne({ where: { id } });
    if (!produto) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }
    return produto;
  }

  async update(id: number, data: Partial<CreateProdutoDto>): Promise<Produto> {
    await this.produtoRepo.update(id, data);
    const updated = await this.produtoRepo.findOne({ where: { id } });
    if (!updated) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }
    return updated;
  }

  async remove(id: number): Promise<void> {
    const result = await this.produtoRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }
  }
}
