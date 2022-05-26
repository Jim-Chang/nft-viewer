export type TEnv = {
  production: boolean;
  chainRPC: string;
  ipfsGatewayURL: string;
  ipfsApiUrl: string;
};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NG_APP_IPFS_API_URL: string;
    }
  }
}
