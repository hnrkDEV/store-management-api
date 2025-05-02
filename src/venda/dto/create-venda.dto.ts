import { IsNumber, Min } from 'class-validator';

export class CreateVendaDto {
  @IsNumber()
  clienteId: number;

  @IsNumber()
  funcionarioId: number;

  @IsNumber()
  produtoId: number;

  @IsNumber()
  @Min(1)
  quantidade: number;
}
