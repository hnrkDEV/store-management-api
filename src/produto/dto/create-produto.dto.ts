import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateProdutoDto {
  @IsNotEmpty()
  nomeProduto: string;

  @IsNumber()
  @Min(0)
  estoque: number;

  @IsNumber()
  @Min(0.01)
  valor: number;
}
