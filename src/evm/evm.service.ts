import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { hexToNumber, hexToBigInt, to0xHex } from '../common/utils/hex';

@Injectable()
export class EvmService {
  constructor(private readonly config: ConfigService) {}

  private async rpc<T>(method: string, params: any[]): Promise<T> {
    const url = this.config.get<string>('EVM_RPC')!;
    const { data } = await axios.post(url, {
      jsonrpc: '2.0', id: 1, method, params,
    });
    if (data.error) throw new Error(data.error.message);
    return data.result as T;
  }

  async getBlockByHeight(height: number) {
    const block = await this.rpc<any>('eth_getBlockByNumber', [to0xHex(height), false]);
    if (!block) return null;
    return {
      height,
      hash: block.hash,
      parentHash: block.parentHash,
      gasLimit: hexToNumber(block.gasLimit),
      gasUsed: hexToNumber(block.gasUsed),
      size: hexToNumber(block.size),
    };
  }

  async getTxByHash(hash: string) {
    const tx = await this.rpc<any>('eth_getTransactionByHash', [hash]);
    if (!tx) return null;
    return {
      hash: tx.hash,
      to: tx.to,
      from: tx.from,
      value: hexToBigInt(tx.value)?.toString(),
      input: tx.input,
      maxFeePerGas: tx.maxFeePerGas ? hexToBigInt(tx.maxFeePerGas)?.toString() : null,
      maxPriorityFeePerGas: tx.maxPriorityFeePerGas ? hexToBigInt(tx.maxPriorityFeePerGas)?.toString() : null,
      gasPrice: tx.gasPrice ? hexToBigInt(tx.gasPrice)?.toString() : null,
    };
  }
}
