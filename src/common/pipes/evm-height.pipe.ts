import { BadRequestException, PipeTransform } from '@nestjs/common';

export class EvmHeightPipe implements PipeTransform<string, number> {
  transform(value: string) {
    const n = Number(value);
    if (!Number.isInteger(n) || n < 0) {
      throw new BadRequestException('height must be a non-negative integer');
    }
    return n;
  }
}
