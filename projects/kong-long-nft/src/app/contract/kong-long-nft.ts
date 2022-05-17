import ABI_KONG_LONG_NFT from './KongLongNFT.json';
import { ERC721 } from 'Lib/contracts/erc-721';
import { from, Observable } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';
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
