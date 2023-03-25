// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { KizClient } from '@rahkarsanat/kiz-sdk';

export const kiz = new KizClient({
  headers: { 'Content-Type': 'application/json' },
  baseURL: process.env.KIZ_URL ? process.env.KIZ_URL : 'http://localhost:2999',
});
