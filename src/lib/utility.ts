import { environment } from 'src/environments/environment';

export const IPFS = 'ipfs://';
export const CLOUDFLARE_IPFS_GATEWAY_URL = 'https://cloudflare-ipfs.com/';

export const zipArray = (rows: any) => rows[0].map((_: any, c: any) => rows.map((row: any) => row[c]));

export function httplizeIpfsUri(uri: string): string {
  if (uri.startsWith(IPFS)) {
    const cid = uri.replace(IPFS, '');
    return environment.production ? `${CLOUDFLARE_IPFS_GATEWAY_URL}ipfs/${cid}` : `/ipfs/${cid}`;
  }
  return uri;
}
