export type TEnv = {
  production: boolean;
  chainRPC: string;
  ipfsGatewayURL: string;
  ipfsApiUrl: string;
  kongLongNFTAddress: string;
  polygonScanURL: string;
  pinataApiKey: string;
  pinataApiSecret: string;
};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NG_APP_IPFS_API_URL: string;
      NG_APP_PINATA_API_KEY: string;
      NG_APP_PINATA_API_SECRET: string;
    }
  }
}
