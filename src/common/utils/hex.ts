export const hexToBigInt = (h?: string | null) =>
  h ? BigInt(h) : null;

export const hexToNumber = (h?: string | null) =>
  h ? Number(BigInt(h)) : null;

export const to0xHex = (n: number | bigint) =>
  '0x' + BigInt(n).toString(16);
