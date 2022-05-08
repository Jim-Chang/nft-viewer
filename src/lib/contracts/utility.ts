import { TERC721 } from './erc-721';
import { KongLongNFT } from './kong-long-nft';
import { ERC721 } from 'Lib/contracts/erc-721';
import { environment } from 'src/environments/environment';

export function getContractClass(): TERC721 {
  if (environment.isKongLongNFT) {
    return KongLongNFT;
  }
  return ERC721;
}
