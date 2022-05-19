export type TEnv = {
  production: boolean;
  corsAnywhereURL: string;
  ipfsGatewayURL: string;
  chainRPC: string;
};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NG_APP_INFURA_PORJ_ID: string;
    }
  }
}
