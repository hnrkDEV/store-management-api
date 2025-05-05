import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { FuncionarioService } from './funcionario.service';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('funcionarios')
@Controller('funcionarios')
export class FuncionarioController {
  constructor(private readonly funcionarioService: FuncionarioService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo funcionário' })
  @ApiResponse({ status: 201, description: 'Funcionário criado com sucesso.' })
  @ApiBody({ type: CreateFuncionarioDto })
  create(@Body() data: CreateFuncionarioDto) {
    return this.funcionarioService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os funcionários' })
  @ApiResponse({ status: 200, description: 'Lista de funcionários retornada com sucesso.' })
  findAll() {
    return this.funcionarioService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um funcionário pelo ID' })
  @ApiResponse({ status: 200, description: 'Funcionário encontrado.' })
  @ApiResponse({ status: 404, description: 'Funcionário não encontrado.' })
  @ApiParam({ name: 'id', required: true, description: 'ID do funcionário' })
  findOne(@Param('id') id: string) {
    return this.funcionarioService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um funcionário pelo ID' })
  @ApiResponse({ status: 200, description: 'Funcionário atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Funcionário não encontrado.' })
  @ApiParam({ name: 'id', required: true, description: 'ID do funcionário' })
  @ApiBody({ type: CreateFuncionarioDto })
  update(@Param('id') id: string, @Body() data: Partial<CreateFuncionarioDto>) {
    return this.funcionarioService.update(+id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um funcionário pelo ID' })
  @ApiResponse({ status: 200, description: 'Funcionário removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Funcionário não encontrado.' })
  @ApiParam({ name: 'id', required: true, description: 'ID do funcionário' })
  remove(@Param('id') id: string) {
    return this.funcionarioService.remove(+id);
  }
}
