import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { EvmService } from './evm.service';
import { EvmHeightPipe } from '../common/pipes/evm-height.pipe';
import { EvmHashPipe } from '../common/pipes/evm-hash.pipe';

@Controller('evm')
export class EvmController {
  constructor(private readonly svc: EvmService) {}

  @Get('block/:height')
  async block(@Param('height', EvmHeightPipe) height: number) {
    const b = await this.svc.getBlockByHeight(height);
    if (!b) throw new NotFoundException('Block not found');
    return b;
  }

  @Get('transactions/:hash')
  async tx(@Param('hash', EvmHashPipe) hash: string) {
    const t = await this.svc.getTxByHash(hash);
    if (!t) throw new NotFoundException('Tx not found');
    return t;
  }
}
