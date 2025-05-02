import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venda } from './venda.entity';
import { CreateVendaDto } from './dto/create-venda.dto';
import { Cliente } from '../cliente/cliente.entity';
import { Funcionario } from '../funcionario/funcionario.entity';
import { Produto } from '../produto/produto.entity';

@Injectable()
export class VendaService {
  constructor( 
    //injetando os repositorios do db
    @InjectRepository(Venda)
    private vendaRepo: Repository<Venda>,

    @InjectRepository(Cliente)
    private clienteRepo: Repository<Cliente>,

    @InjectRepository(Funcionario)
    private funcionarioRepo: Repository<Funcionario>,

    @InjectRepository(Produto)
    private produtoRepo: Repository<Produto>,
  ) {}

  async create(data: CreateVendaDto): Promise<Venda> {
    // 1 - 'settar' os clientes/func/produtos
    const cliente = await this.clienteRepo.findOne({ where: { id: data.clienteId } }); 
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }

    const funcionario = await this.funcionarioRepo.findOne({ where: { id: data.funcionarioId } });
    if (!funcionario) {
      throw new NotFoundException('Funcionário não encontrado');
    }

    const produto = await this.produtoRepo.findOne({ where: { id: data.produtoId } });
    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }

    // 2 - verificar o estoque dos produtos
    if (produto.estoque < data.quantidade) {
      throw new BadRequestException('Estoque insuficiente');
    }

    // 3 - mudar o estoque
    produto.estoque -= data.quantidade;
    await this.produtoRepo.save(produto);

    // 4 - Realizar a venda
    const venda = this.vendaRepo.create({
      cliente, funcionario, produto, quantidade: data.quantidade
    });

    return this.vendaRepo.save(venda);
  }

  async findAll(): Promise<Venda[]> {
    // retornar todas as vendas com relação aos clientes/func/prod no DB
    return this.vendaRepo.find({ relations: ['cliente', 'funcionario', 'produto'] });
  }
}
