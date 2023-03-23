import { KizClient } from '@rahkarsanat/kiz-sdk';

export const kiz = new KizClient({
  headers: { 'Content-Type': 'application/json' },
  baseURL: process.env.KIZ_URL ?? 'localhost',
});
