import { TEnv } from './type';

export const environment: TEnv = {
  production: true,
  corsAnywhereURL: 'https://cors.koding.work/',
  ipfsGatewayURL: 'https://ipfs.fleek.co/',
  chainRPC: `https://mainnet.infura.io/v3/${process.env.NG_APP_INFURA_PORJ_ID}`,
};
