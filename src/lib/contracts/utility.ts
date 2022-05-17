import { TERC721 } from './erc-721';
import { ERC721 } from 'Lib/contracts/erc-721';

export function getContractClass(): TERC721 {
  return ERC721;
}
