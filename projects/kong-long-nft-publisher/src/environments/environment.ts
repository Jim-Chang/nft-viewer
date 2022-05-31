import { TEnv } from './type';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment: TEnv = {
  production: false,
  chainRPC: 'https://polygon-rpc.com',
  ipfsGatewayURL: 'https://ipfs.koding.work/',
  ipfsApiUrl: `${process.env.NG_APP_IPFS_API_URL}`,
  kongLongNFTAddress: '0xFdC358a54eFC63aa0132b42546c6E10A15aAe2D7',
  polygonScanURL: 'https://mumbai.polygonscan.com/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
