import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { FuncionarioService } from './funcionario.service';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';

@Controller('funcionarios')
export class FuncionarioController {
  constructor(private readonly funcionarioService: FuncionarioService) {}

  @Post()
  create(@Body() data: CreateFuncionarioDto) {
    return this.funcionarioService.create(data);
  }

  @Get()
  findAll() {
    return this.funcionarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.funcionarioService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<CreateFuncionarioDto>) {
    return this.funcionarioService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.funcionarioService.remove(+id);
  }
}
