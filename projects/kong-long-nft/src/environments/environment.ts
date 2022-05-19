// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { TEnv } from './type';

export const environment: TEnv = {
  production: false,
  NFTchainId: 137,
  corsAnywhereURL: 'http://127.0.0.1:8080/',
  ipfsGatewayURL: 'https://ipfs.koding.work/',
  kongLongNFTAddress: '0x8001ed4ea0F7866ba4585706726aaec0159bd50b',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
