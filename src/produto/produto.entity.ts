import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nomeProduto: string;

  @CreateDateColumn({ type: 'timestamp' })
  dataCriacao: Date;

  @Column()
  estoque: number;

  @Column('decimal', { precision: 10, scale: 2 })
  valor: number;
}
