export type TEnv = {
  production: boolean;
  chainRPC: string;
  ipfsGatewayURL: string;
  ipfsApiUrl: string;
  kongLongNFTAddress: string;
  polygonScanURL: string;
};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NG_APP_IPFS_API_URL: string;
    }
  }
}
