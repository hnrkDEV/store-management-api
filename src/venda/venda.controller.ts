import { Controller, Post, Body, Get } from '@nestjs/common';
import { VendaService } from './venda.service';
import { CreateVendaDto } from './dto/create-venda.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('vendas')
@Controller('vendas')
export class VendaController {
  constructor(private readonly vendaService: VendaService) {}

  @Post()
  @ApiOperation({ summary: 'Realiza uma nova venda' })
  @ApiResponse({ status: 201, description: 'Venda realizada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Estoque insuficiente ou dados inválidos.' })
  @ApiResponse({ status: 404, description: 'Cliente, funcionário ou produto não encontrado.' })
  @ApiBody({ type: CreateVendaDto })
  create(@Body() data: CreateVendaDto) {
    return this.vendaService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as vendas' })
  @ApiResponse({ status: 200, description: 'Lista de vendas retornada com sucesso.' })
  findAll() {
    return this.vendaService.findAll();
  }
}
