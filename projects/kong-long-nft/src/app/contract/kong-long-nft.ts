import { TTransaction } from './../../../../lib-web3/src/lib/services/web3-provider.type';
import ABI_KONG_LONG_NFT from './KongLongNFT.json';
import { ERC721 } from 'projects/lib-web3/src/lib/contracts/erc-721';
import { from, Observable, forkJoin } from 'rxjs';
import { shareReplay, switchMap, mergeMap } from 'rxjs/operators';
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
    const mintToken = this.web3Contract.methods.mintToken(owner, tokenURI);
    const getGasPrice$ = from(this.web3.eth.getGasPrice());
    const estimateGas$ = from(mintToken.estimateGas({ from: fromAccount }));

    return forkJoin([getGasPrice$, estimateGas$]).pipe(
      mergeMap(([gasPrice, estimateGas]) => {
        const gas = Math.ceil((estimateGas as number) * 1.5);
        console.log(`gas price: ${gasPrice}, estimate gas: ${estimateGas}, max gas: ${gas}`);
        return from(mintToken.send({ from: fromAccount, gasPrice, gas }));
      }),
    ) as Observable<TTransaction>;
  }

  protected get abi(): AbiItem | AbiItem[] {
    return ABI_KONG_LONG_NFT as AbiItem[];
  }
}
