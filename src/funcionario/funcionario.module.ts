import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Funcionario } from './funcionario.entity';
import { FuncionarioController } from './funcionario.controller';
import { FuncionarioService } from './funcionario.service';

@Module({
  imports: [TypeOrmModule.forFeature([Funcionario])],
  controllers: [FuncionarioController],
  providers: [FuncionarioService],
})
export class FuncionarioModule {}
