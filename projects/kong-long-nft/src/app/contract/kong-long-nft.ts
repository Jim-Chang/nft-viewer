import ABI_KONG_LONG_NFT from './KongLongNFT.json';
import { BaseContract } from 'Lib/contracts/base-contract';
import { ERC721 } from 'Lib/contracts/erc-721';
import { from, forkJoin, Observable, zip, of } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

export class KongLongNFT extends ERC721 {
  private _currentTokenId$: Observable<number>;

  totalSupply$(): Observable<number> {
    return this.getCurrentTokenId$();
  }

  getCurrentTokenId$(): Observable<number> {
    if (!this._currentTokenId$) {
      this._currentTokenId$ = (from(this.web3Contract.methods.getCurrentTokenId().call()) as Observable<number>).pipe(
        shareReplay(1),
      );
    }
    return this._currentTokenId$;
  }

  protected get abi(): AbiItem | AbiItem[] {
    return ABI_KONG_LONG_NFT as AbiItem[];
  }
}
