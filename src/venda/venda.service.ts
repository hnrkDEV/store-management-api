import { BadRequestException, Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venda } from './venda.entity';
import { CreateVendaDto } from './dto/create-venda.dto';
import { Cliente } from '../cliente/cliente.entity';
import { Funcionario } from '../funcionario/funcionario.entity';
import { Produto } from '../produto/produto.entity';

@Injectable()
export class VendaService {
  private readonly logger = new Logger(VendaService.name); 

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
      this.logger.warn(`Tentativa de venda com um cliente não existente, id do cliente: ${data.clienteId}`);
      throw new NotFoundException('Cliente não encontrado');
    }

    const funcionario = await this.funcionarioRepo.findOne({ where: { id: data.funcionarioId } });
    if (!funcionario) {
      this.logger.warn(`Tentativa de venda com um funcionário não existente, id do func ${data.funcionarioId}`);
      throw new NotFoundException('Funcionário não encontrado');
    }

    const produto = await this.produtoRepo.findOne({ where: { id: data.produtoId } });
    if (!produto) {
      this.logger.warn(`Produto não encontrado no db, id do produto: ${data.produtoId}`);
      throw new NotFoundException('Produto não encontrado');
    }

    // 2 - verificar o estoque dos produtos
    if (produto.estoque < data.quantidade) {
      this.logger.warn(`Estoque insuficiente do Produto: ${produto.id}, quantidade solicitada: ${data.quantidade}, Disponível no estoque: ${produto.estoque}`);
      throw new BadRequestException('Estoque insuficiente');
    }

    // 3 - mudar o estoque
    produto.estoque -= data.quantidade;
    await this.produtoRepo.save(produto);

    // 4 - Realizar a venda
    const venda = this.vendaRepo.create({
      cliente, funcionario, produto, quantidade: data.quantidade
    });
    this.logger.log(`Venda registrada com sucesso! Cliente: ${cliente.id}, Funcionário: ${funcionario.id}, Produto: ${produto.id}, Quantidade: ${data.quantidade}`);

    return this.vendaRepo.save(venda);
  }

  async findAll(): Promise<Venda[]> {
    // retornar todas as vendas com relação aos clientes/func/prod no DB
    this.logger.log('Listando todas as vendas');
    return this.vendaRepo.find({ relations: ['cliente', 'funcionario', 'produto'] });
  }
}
