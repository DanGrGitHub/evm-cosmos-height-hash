import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { CosmosService } from './cosmos.service';
import { EvmHeightPipe } from '../common/pipes/evm-height.pipe';
import { CosmosHashPipe } from '../common/pipes/cosmos-hash.pipe';

@Controller('cosmos')
export class CosmosController {
  constructor(private readonly svc: CosmosService) {}

  @Get('block/:height')
  async block(@Param('height', EvmHeightPipe) height: number) {
    const b = await this.svc.getBlockByHeight(height);
    if (!b) throw new NotFoundException('Block not found');
    return b;
  }

  @Get('transactions/:hash')
  async tx(@Param('hash', CosmosHashPipe) hash: string) {
    const t = await this.svc.getTxByHash(hash);
    if (!t) throw new NotFoundException('Tx not found');
    return t;
  }
}
