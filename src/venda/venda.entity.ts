import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Cliente } from '../cliente/cliente.entity';
import { Funcionario } from '../funcionario/funcionario.entity';
import { Produto } from '../produto/produto.entity';

@Entity()
export class Venda {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cliente)
  cliente: Cliente;

  @ManyToOne(() => Funcionario)
  funcionario: Funcionario;

  @ManyToOne(() => Produto)
  produto: Produto;

  @Column()
  quantidade: number;

  @CreateDateColumn({ type: 'timestamp' })
  dataVenda: Date;
}
