import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { AddOptions } from 'ipfs-core-types/src/root';
import { ImportCandidate } from 'ipfs-core-types/src/utils';
import { create as createIpfsClient, IPFSHTTPClient } from 'ipfs-http-client';
import { from, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export const IPFS_GATEWAY_URL_TOKEN = new InjectionToken<string>('IPFS_GATEWAY_URL_TOKEN');
export const IPFS_API_URL_TOKEN = new InjectionToken<string>('IPFS_API_URL_TOKEN');
export const CORS_ANYWHERE_URL_TOKEN = new InjectionToken<string>('CORS_ANYWHERE_URL_TOKEN');

@Injectable({
  providedIn: 'root',
})
export class IpfsService {
  private IPFS_SCHEMA = 'ipfs://';
  private PINATA_GATEWAY_URL = 'https://gateway.pinata.cloud/';

  private client: IPFSHTTPClient;

  constructor(
    @Inject(IPFS_GATEWAY_URL_TOKEN) private gatewayUrl: string,
    @Inject(IPFS_API_URL_TOKEN) @Optional() private apiUrl: string,
    @Inject(CORS_ANYWHERE_URL_TOKEN) @Optional() private corsAnyUrl: string,
  ) {
    if (this.apiUrl) {
      this.client = createIpfsClient({ url: this.apiUrl });
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
    return from(this.client.files.cp(`/ipfs/${hash}`, `/${target}`));
  }

  add$(entry: ImportCandidate, fileName?: string, options?: AddOptions): Observable<string> {
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

  addAndPin$(entry: ImportCandidate, fileName?: string): Observable<string> {
    return this.add$(entry, fileName, { pin: true });
  }

  addIpfs2Hash(hash: string): string {
    return `ipfs://${hash}`;
  }
}
