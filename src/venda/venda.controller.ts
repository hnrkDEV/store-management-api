import { Controller, Post, Body, Get } from '@nestjs/common';
import { VendaService } from './venda.service';
import { CreateVendaDto } from './dto/create-venda.dto';

@Controller('vendas')
export class VendaController {
  constructor(private readonly vendaService: VendaService) {}

  @Post()
  create(@Body() data: CreateVendaDto) {
    return this.vendaService.create(data);
  }

  @Get()
  findAll() {
    return this.vendaService.findAll();
  }
}
