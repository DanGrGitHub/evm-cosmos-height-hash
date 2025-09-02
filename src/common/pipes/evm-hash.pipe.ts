import { BadRequestException, PipeTransform } from '@nestjs/common';

export class EvmHashPipe implements PipeTransform<string, string> {
  transform(value: string) {
    if (!/^0x[0-9a-fA-F]{64}$/.test(value)) {
      throw new BadRequestException('invalid EVM tx hash');
    }
    return value.toLowerCase();
  }
}
