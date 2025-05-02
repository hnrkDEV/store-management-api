import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from './cliente/cliente.module';
import { FuncionarioModule } from './funcionario/funcionario.module';
import { ProdutoModule } from './produto/produto.module';
import { VendaModule } from './venda/venda.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'store_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    ClienteModule,
    FuncionarioModule,
    ProdutoModule,
    VendaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
