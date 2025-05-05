import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('clientes')
@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo cliente' })
  @ApiResponse({ status: 201, description: 'Cliente criado com sucesso.' })
  @ApiBody({ type: CreateClienteDto })
  create(@Body() data: CreateClienteDto) {
    return this.clienteService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os clientes' })
  @ApiResponse({ status: 200, description: 'Lista de clientes retornada com sucesso.' })
  findAll() {
    return this.clienteService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um cliente pelo ID' })
  @ApiResponse({ status: 200, description: 'Cliente encontrado.' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado.' })
  @ApiParam({ name: 'id', required: true, description: 'ID do cliente' })
  findOne(@Param('id') id: string) {
    return this.clienteService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um cliente pelo ID' })
  @ApiResponse({ status: 200, description: 'Cliente atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado.' })
  @ApiParam({ name: 'id', required: true, description: 'ID do cliente' })
  @ApiBody({ type: CreateClienteDto })
  update(@Param('id') id: string, @Body() data: Partial<CreateClienteDto>) {
    return this.clienteService.update(+id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um cliente pelo ID' })
  @ApiResponse({ status: 200, description: 'Cliente removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado.' })
  @ApiParam({ name: 'id', required: true, description: 'ID do cliente' })
  remove(@Param('id') id: string) {
    return this.clienteService.remove(+id);
  }
}
