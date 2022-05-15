import { environment } from 'src/environments/environment';

export const IPFS = 'ipfs://';
export const CLOUDFLARE_IPFS_GATEWAY_URL = 'https://cf-ipfs.com/';
export const CORS_ANYWHERE = environment.corsAnywhereURL;

export const zipArray = (rows: any) => rows[0].map((_: any, c: any) => rows.map((row: any) => row[c]));

export function httplizeIpfsUri(uri: string): string {
  if (uri.startsWith(IPFS)) {
    const cid = uri.replace(IPFS, '');
    return `${CLOUDFLARE_IPFS_GATEWAY_URL}ipfs/${cid}`;
  }
  return uri;
}

export function addCorsProxy(url: string): string {
  return `${CORS_ANYWHERE}${url}`;
}

export function range(start: number, end: number): number[] {
  return [...Array(end - start + 1).keys()].map((x) => x + start);
}
