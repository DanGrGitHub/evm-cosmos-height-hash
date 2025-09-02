import { BadRequestException, PipeTransform } from '@nestjs/common';

export class CosmosHashPipe implements PipeTransform<string, string> {
  transform(value: string) {
    if (!/^[0-9a-fA-F]{64}$/.test(value)) {
      throw new BadRequestException('invalid Cosmos tx hash');
    }
    return value.toUpperCase();
  }
}
 