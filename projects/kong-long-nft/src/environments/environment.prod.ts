import { TEnv } from './type';

export const environment: TEnv = {
  production: true,
  NFTchainId: 137,
  corsAnywhereURL: `${process.env.NG_APP_CORS_ANYWHERE_URL}`,
  ipfsGatewayURL: `${process.env.NG_APP_IPFS_GATEWAY_URL}`,
  kongLongNFTAddress: '0x8001ed4ea0F7866ba4585706726aaec0159bd50b',
  chainRPC: 'https://polygon-rpc.com',
};
