import { CreateAxiosDefaults } from 'axios';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export const KIZ_CONFIG = (jwt?: string): CreateAxiosDefaults => {
  return {
    headers: {
      'Content-Type': 'application/json',
      common: {
        Authorization: jwt,
      },
    },
    baseURL: process.env.KIZ_URL
      ? process.env.KIZ_URL
      : 'http://localhost:2999',
  };
};
