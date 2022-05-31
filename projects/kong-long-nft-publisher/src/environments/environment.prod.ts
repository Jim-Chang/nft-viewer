import { TEnv } from './type';

export const environment: TEnv = {
  production: true,
  chainRPC: 'https://polygon-rpc.com',
  ipfsGatewayURL: 'https://ipfs.koding.work/',
  ipfsApiUrl: `${process.env.NG_APP_IPFS_API_URL}`,
  kongLongNFTAddress: '0x8001ed4ea0F7866ba4585706726aaec0159bd50b',
  polygonScanURL: 'https://polygonscan.com/',
};
