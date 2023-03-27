import { AuthTokenDto } from '@apis';
import {
  APP_DOMAIN,
  APP_GRANT_TYPE,
  APP_ROLES,
  APP_SCOPE,
} from '@common/constants';

export const APP_AUTH = (): AuthTokenDto => {
  return {
    grant_type: APP_GRANT_TYPE,
    scope: APP_SCOPE,
    domain: APP_DOMAIN,
    roles: APP_ROLES,
    app_id: process.env.APP_ID,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
  };
};
