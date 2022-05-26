import { TERC721 } from './erc-721';
import { ERC721 } from 'projects/lib-web3/src/lib/contracts/erc-721';

export function getContractClass(): TERC721 {
  return ERC721;
}
