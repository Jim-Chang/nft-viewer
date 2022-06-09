import { TEnv } from './type';

export const environment: TEnv = {
  production: true,
  corsAnywhereURL: `${process.env.NG_APP_CORS_ANYWHERE_URL}`,
  ipfsGatewayURL: `${process.env.NG_APP_IPFS_GATEWAY_URL}`,
  chainRPC: `https://mainnet.infura.io/v3/${process.env.NG_APP_INFURA_PORJ_ID}`,
};
