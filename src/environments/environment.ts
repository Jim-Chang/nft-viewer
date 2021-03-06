import { TEnv } from './type';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment: TEnv = {
  production: false,
  corsAnywhereURL: 'http://127.0.0.1:8080/',
  ipfsGatewayURL: `${process.env.NG_APP_IPFS_GATEWAY_URL}`,
  chainRPC: `https://mainnet.infura.io/v3/${process.env.NG_APP_INFURA_PORJ_ID}`,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
