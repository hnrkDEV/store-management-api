import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateFuncionarioDto {
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  senha: string;
}
