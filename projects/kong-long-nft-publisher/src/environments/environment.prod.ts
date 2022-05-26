import { TEnv } from './type';

export const environment: TEnv = {
  production: true,
  chainRPC: 'https://polygon-rpc.com',
  ipfsGatewayURL: 'https://ipfs.koding.work/',
  ipfsApiUrl: `${process.env.NG_APP_IPFS_API_URL}`,
};
