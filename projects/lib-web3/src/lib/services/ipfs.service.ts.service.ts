import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import pinataSDK, { PinataClient } from '@pinata/sdk';
import { AddOptions } from 'ipfs-core-types/src/root';
import { ImportCandidate } from 'ipfs-core-types/src/utils';
import { create as createIpfsClient, IPFSHTTPClient } from 'ipfs-http-client';
import { from, Observable, of, iif } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export const IPFS_GATEWAY_URL_TOKEN = new InjectionToken<string>('IPFS_GATEWAY_URL_TOKEN');
export const IPFS_API_URL_TOKEN = new InjectionToken<string>('IPFS_API_URL_TOKEN');
export const CORS_ANYWHERE_URL_TOKEN = new InjectionToken<string>('CORS_ANYWHERE_URL_TOKEN');
export const PINATA_API_KEY_TOKEN = new InjectionToken<string>('PINATA_API_KEY_TOKEN');
export const PINATA_API_SECRET_TOKEN = new InjectionToken<string>('PINATA_API_SECRET_TOKEN');

@Injectable({
  providedIn: 'root',
})
export class IpfsService {
  private IPFS_SCHEMA = 'ipfs://';
  private PINATA_GATEWAY_URL = 'https://gateway.pinata.cloud/';

  private client: IPFSHTTPClient;
  private pinata: PinataClient;

  constructor(
    @Inject(IPFS_GATEWAY_URL_TOKEN) private gatewayUrl: string,
    @Inject(IPFS_API_URL_TOKEN) @Optional() private apiUrl: string,
    @Inject(CORS_ANYWHERE_URL_TOKEN) @Optional() private corsAnyUrl: string,
    @Inject(PINATA_API_KEY_TOKEN) @Optional() private pinataApiKey: string,
    @Inject(PINATA_API_SECRET_TOKEN) @Optional() private pinataApiSecret: string,
  ) {
    if (this.apiUrl) {
      this.client = createIpfsClient({ url: this.apiUrl });
    }
    if (this.pinataApiKey && this.pinataApiSecret) {
      this.pinata = pinataSDK(this.pinataApiKey, this.pinataApiSecret);
    }
  }

  httplizeIpfsUri(uri: string): string {
    if (uri.startsWith(this.IPFS_SCHEMA)) {
      const cid = uri.replace(this.IPFS_SCHEMA, '');
      return `${this.gatewayUrl}ipfs/${cid}`;
    }
    return uri;
  }

  addCorsProxy(url: string): string {
    if (!this.corsAnyUrl) {
      throw 'Please inject CORS proxy server url through CORS_ANYWHERE_URL_TOKEN';
    }
    if (url.startsWith(this.gatewayUrl)) {
      return url;
    }
    return `${this.corsAnyUrl}${url}`;
  }

  replacePinataGateway(url: string): string {
    if (url.includes(this.PINATA_GATEWAY_URL)) {
      return url.replace(this.PINATA_GATEWAY_URL, this.gatewayUrl);
    }
    return url;
  }

  cpToMFS$(hash: string, target: string): Observable<void> {
    if (!this.client) {
      throw 'Please inject IPFS_API_URL_TOKEN';
    }
    return from(this.client.files.cp(`/ipfs/${hash}`, `/${target}`));
  }

  add$(entry: ImportCandidate, fileName?: string, options?: AddOptions): Observable<string> {
    if (!this.client) {
      throw 'Please inject IPFS_API_URL_TOKEN';
    }

    let hash = '';
    return from(this.client.add(entry)).pipe(
      switchMap((ret) => {
        hash = ret.path;
        if (fileName) {
          return this.cpToMFS$(hash, fileName);
        } else {
          return of();
        }
      }),
      map(() => hash),
    );
  }

  addAndPin$(entry: ImportCandidate, fileName?: string, pinPinata = true): Observable<string> {
    let hash = '';
    return this.add$(entry, fileName, { pin: true }).pipe(
      switchMap((_hash) => {
        hash = _hash;
        return iif(() => pinPinata, this.pinToPinata$(hash), of());
      }),
      map(() => hash),
    );
  }

  pinToPinata$(hash: string): Observable<void> {
    if (!this.pinata) {
      throw 'Please inject PINATA_API_KEY_TOKEN and PINATA_API_SECRET_TOKEN';
    }
    return from(this.pinata.pinByHash(hash)).pipe(
      map((ret) => {
        console.log('pin to pinata', ret);
        return;
      }),
    );
  }

  addIpfs2Hash(hash: string): string {
    return `ipfs://${hash}`;
  }
}
