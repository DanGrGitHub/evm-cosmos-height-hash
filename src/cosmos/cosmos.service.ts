import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CosmosService {
  constructor(private readonly config: ConfigService) {}

  async getBlockByHeight(height: number) {
    const base = this.config.get<string>('COSMOS_RPC')!;
    const { data } = await axios.get(`${base}/block`, { params: { height } });
    const r = data.result;
    return {
      height: Number(r.block.header.height),
      time: r.block.header.time,
      hash: r.block_id?.hash,
      proposerAddress: r.block.header.proposer_address,
    };
  }

  async getTxByHash(hash: string) {
    const base = this.config.get<string>('COSMOS_RPC')!;
    // gRPC-gateway REST: /cosmos/tx/v1beta1/txs/{hash}
    const { data } = await axios.get(`${base}/cosmos/tx/v1beta1/txs/${hash}`);
    const tx = data.tx;
    const resp = data.tx_response;
    const fee = tx?.auth_info?.fee;
    const amount = (fee?.amount ?? []).map((c: any) => `${c.amount}${c.denom}`).join(',');
    const sender =
      tx?.body?.messages?.[0]?.from_address ??
      tx?.body?.messages?.[0]?.sender ??
      null;

    return {
      hash: resp?.txhash ?? hash,
      height: Number(resp?.height ?? 0),
      time: resp?.timestamp ?? null,
      gasUsed: Number(resp?.gas_used ?? 0),
      gasWanted: Number(resp?.gas_wanted ?? 0),
      fee: amount || (fee?.gas_limit ? `${fee.gas_limit}gas` : null),
      sender,
    };
  }
}
