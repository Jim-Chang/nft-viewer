import { TTokenInfo } from './type-define';
import { zipArray } from './utility';
import ABI_ERC721 from 'projects/lib-web3/src/lib/abi/ERC721.json';
import { BaseContract } from 'projects/lib-web3/src/lib/contracts/base-contract';
import { from, forkJoin, Observable, zip, of } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

export type TERC721 = new (web3: Web3, address: string) => ERC721;

export interface IERC721 {
  name$(): Observable<string>;
  symbol$(): Observable<string>;
  tokenURI$(tokenId: number): Observable<string>;
  ownerOf$(tokenId: number): Observable<string>;
  balanceOf$(owner: string): Observable<number>;
  totalSupply$(): Observable<number>;
}

export class ERC721 extends BaseContract implements IERC721 {
  private _name$: Observable<string>;
  private _symbol$: Observable<string>;
  private _owner$: { [tokenId: number]: Observable<string> } = {};
  private _tokenURI$: { [tokenId: number]: Observable<string> } = {};
  private _balanceOf$: { [owner: string]: Observable<number> } = {};
  private _totalSupply$: Observable<number>;
  private tokenInfoMap: { [tokenId: number]: TTokenInfo } = {};

  name$(): Observable<string> {
    if (!this._name$) {
      this._name$ = (from(this.web3Contract.methods.name().call()) as Observable<string>).pipe(shareReplay(1));
    }
    return this._name$;
  }

  symbol$(): Observable<string> {
    if (!this._symbol$) {
      this._symbol$ = (from(this.web3Contract.methods.symbol().call()) as Observable<string>).pipe(shareReplay(1));
    }
    return this._symbol$;
  }

  tokenURI$(tokenId: number): Observable<string> {
    if (!this._tokenURI$[tokenId]) {
      this._tokenURI$[tokenId] = (from(this.web3Contract.methods.tokenURI(tokenId).call()) as Observable<string>).pipe(
        shareReplay(1),
      );
    }
    return this._tokenURI$[tokenId];
  }

  ownerOf$(tokenId: number): Observable<string> {
    if (!this._owner$[tokenId]) {
      this._owner$[tokenId] = (from(this.web3Contract.methods.ownerOf(tokenId).call()) as Observable<string>).pipe(
        shareReplay(1),
      );
    }
    return this._owner$[tokenId];
  }

  balanceOf$(owner: string): Observable<number> {
    if (!this._balanceOf$[owner]) {
      this._balanceOf$[owner] = (from(this.web3Contract.methods.balanceOf(owner).call()) as Observable<number>).pipe(
        shareReplay(1),
      );
    }
    return this._balanceOf$[owner];
  }

  totalSupply$(): Observable<number> {
    if (!this._totalSupply$) {
      this._totalSupply$ = (from(this.web3Contract.methods.totalSupply().call()) as Observable<number>).pipe(
        shareReplay(1),
      );
    }
    return this._totalSupply$;
  }

  getTokenInfo$(tokenId: number): Observable<TTokenInfo> {
    if (tokenId in this.tokenInfoMap) {
      return of(this.tokenInfoMap[tokenId]);
    }
    return forkJoin([this.name$(), this.ownerOf$(tokenId), this.tokenURI$(tokenId)]).pipe(
      map(([contractName, owner, tokenURI]) => {
        this.tokenInfoMap[tokenId] = { id: tokenId, owner, tokenURI, contractName, contractAddress: this.address };
        return this.tokenInfoMap[tokenId];
      }),
    );
  }

  getTokenInfos$(tokenIdList: number[]): Observable<TTokenInfo[]> {
    const mapKeySet = new Set(Object.keys(this.tokenInfoMap));
    const needGetIds = tokenIdList.filter((tid) => !mapKeySet.has(tid.toString()));

    if (needGetIds.length === 0) {
      return of(tokenIdList.map((tid) => this.tokenInfoMap[tid]));
    }

    let contractName: string;

    return this.name$().pipe(
      switchMap((name) => {
        contractName = name;
        return zip(
          forkJoin(needGetIds.map((tokenId) => this.ownerOf$(tokenId))),
          forkJoin(needGetIds.map((tokenId) => this.tokenURI$(tokenId))),
        );
      }),
      map(([owners, tokenURIs]) => {
        zipArray([needGetIds, owners, tokenURIs]).forEach(([tokenId, owner, tokenURI]: [number, string, string]) => {
          this.tokenInfoMap[tokenId] = { id: tokenId, owner, tokenURI, contractName, contractAddress: this.address };
        });
        return tokenIdList.map((tid) => this.tokenInfoMap[tid]);
      }),
    );
  }

  protected get abi(): AbiItem | AbiItem[] {
    return ABI_ERC721 as AbiItem[];
  }
}
