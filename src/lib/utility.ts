import { environment } from 'src/environments/environment';

export const IPFS = 'ipfs://';
export const FLEEK_IPFS_GATEWAY_URL = 'https://ipfs.fleek.co/';
export const PINATA_GATEWAY_URL = 'https://gateway.pinata.cloud/';
export const CORS_ANYWHERE = environment.corsAnywhereURL;

export const zipArray = (rows: any) => rows[0].map((_: any, c: any) => rows.map((row: any) => row[c]));

export function httplizeIpfsUri(uri: string): string {
  if (uri.startsWith(IPFS)) {
    const cid = uri.replace(IPFS, '');
    return `${FLEEK_IPFS_GATEWAY_URL}ipfs/${cid}`;
  }
  return uri;
}

export function addCorsProxy(url: string): string {
  if (url.startsWith(FLEEK_IPFS_GATEWAY_URL)) {
    return url;
  }
  return `${CORS_ANYWHERE}${url}`;
}

export function replacePinataGateway(url: string): string {
  if (url.includes(PINATA_GATEWAY_URL)) {
    return url.replace(PINATA_GATEWAY_URL, FLEEK_IPFS_GATEWAY_URL);
  }
  return url;
}

export function range(start: number, end: number): number[] {
  return [...Array(end - start + 1).keys()].map((x) => x + start);
}

export function shuffle(array: any[]): any[] {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}
