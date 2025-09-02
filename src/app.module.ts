import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EvmController } from './evm/evm.controller';
import { EvmService } from './evm/evm.service';
import { CosmosController } from './cosmos/cosmos.controller';
import { CosmosService } from './cosmos/cosmos.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [EvmController, CosmosController],
  providers: [EvmService, CosmosService],
})
export class AppModule {}
