import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venda } from './venda.entity';
import { VendaService } from './venda.service';
import { VendaController } from './venda.controller';
import { Cliente } from '../cliente/cliente.entity';
import { Funcionario } from '../funcionario/funcionario.entity';
import { Produto } from '../produto/produto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Venda, Cliente, Funcionario, Produto])],
  providers: [VendaService],
  controllers: [VendaController],
})
export class VendaModule {}
