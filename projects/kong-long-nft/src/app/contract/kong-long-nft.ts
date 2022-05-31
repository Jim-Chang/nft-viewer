import { TTransaction } from './../../../../lib-web3/src/lib/services/web3-provider.type';
import ABI_KONG_LONG_NFT from './KongLongNFT.json';
import { ERC721 } from 'projects/lib-web3/src/lib/contracts/erc-721';
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

  mint(owner: string, tokenURI: string, fromAccount: string): Observable<TTransaction> {
    return from(
      this.web3Contract.methods.mintToken(owner, tokenURI).send({ from: fromAccount }),
    ) as Observable<TTransaction>;
  }

  protected get abi(): AbiItem | AbiItem[] {
    return ABI_KONG_LONG_NFT as AbiItem[];
  }
}
