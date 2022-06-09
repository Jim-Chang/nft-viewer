import { TEnv } from './type';

export const environment: TEnv = {
  production: true,
  chainRPC: 'https://polygon-rpc.com',
  ipfsGatewayURL: `${process.env.NG_APP_IPFS_GATEWAY_URL}`,
  ipfsApiUrl: `${process.env.NG_APP_IPFS_API_URL}`,
  kongLongNFTAddress: '0x8001ed4ea0F7866ba4585706726aaec0159bd50b',
  polygonScanURL: 'https://polygonscan.com/',
  pinataApiKey: `${process.env.NG_APP_PINATA_API_KEY}`,
  pinataApiSecret: `${process.env.NG_APP_PINATA_API_SECRET}`,
};
