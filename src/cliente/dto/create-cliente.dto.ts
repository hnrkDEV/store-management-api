import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateClienteDto {
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  cpf: string;

  @MinLength(6)
  senha: string;
}
