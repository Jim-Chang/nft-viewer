import { TBaseContract } from '../contracts/base-contract';
import { TConnectInfo, IProviderRpcError, CHAIN_ID_NAME_MAP } from './web3-provider.type';
import { Inject, Injectable, InjectionToken, NgZone } from '@angular/core';
import { BaseContract } from 'projects/lib-web3/src/lib/contracts/base-contract';
import { from, iif, Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import Web3 from 'web3';

export function chainIdToName(chainId: number): string {
  return CHAIN_ID_NAME_MAP[chainId] ?? 'unknown';
}

export const FALLBACK_CHAIN_RPC_TOKEN = new InjectionToken<string>('FALLBACK_CHAIN_RPC_TOKEN');

@Injectable({
  providedIn: 'root',
})
export class Web3ProviderService {
  private web3: Web3;
  private contractMap: { [address: string]: BaseContract } = {};

  constructor(private ngZone: NgZone, @Inject(FALLBACK_CHAIN_RPC_TOKEN) private chainRPC: string) {
    if (Web3.givenProvider) {
      this.web3 = new Web3(Web3.givenProvider);
    } else {
      console.log('web3 provider not found');
      this.web3 = new Web3(chainRPC);
    }
  }

  isBrowserSupportWeb3(): boolean {
    return !!Web3.givenProvider;
  }

  getChainId$(): Observable<number> {
    return from(this.web3.eth.getChainId());
  }

  getChainName$(): Observable<string> {
    return from(this.web3.eth.getChainId()).pipe(map((id) => chainIdToName(id)));
  }

  requestAccounts$(): Observable<string[]> {
    return from(this.web3.eth.requestAccounts());
  }

  getAccounts$(): Observable<string[]> {
    return from(this.web3.eth.getAccounts());
  }

  getBlock(index: number): Observable<any> {
    return from(this.web3.eth.getBlock(index));
  }

  getContract(contractCls: TBaseContract, address: string): BaseContract {
    if (!this.contractMap[address]) {
      this.contractMap[address] = new contractCls(this.web3, address);
    }
    return this.contractMap[address];
  }

  isAddress(address: string): boolean {
    return this.web3.utils.isAddress(address);
  }

  isContractAddress$(address: string): Observable<boolean> {
    return from(this.web3.eth.getCode(address)).pipe(map((ret) => ret !== '0x'));
  }

  switchChain$(chainId: number): Observable<boolean> {
    return from(
      window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      }),
    ).pipe(
      map(() => true),
      catchError((err) => {
        console.log('switch chain error', err);
        return of(false);
      }),
    );
  }

  switchChainIfNeed$(chainId: number): Observable<boolean> {
    // if browser support web3, check chain id if need switch
    if (this.isBrowserSupportWeb3()) {
      return this.getChainId$().pipe(
        switchMap((id) => {
          return iif(() => id === chainId, of(true), this.switchChain$(chainId));
        }),
      );
    } else {
      // if browser not support, default use chainRPC, can't switch
      return of(true);
    }
  }

  // event
  connect$(): Observable<TConnectInfo> {
    return new Observable<TConnectInfo>((subscriber) => {
      window.ethereum.on('connect', (connectInfo) => {
        this.ngZone.run(() => subscriber.next(connectInfo as TConnectInfo));
      });
    });
  }

  disconnect$(): Observable<IProviderRpcError> {
    return new Observable<IProviderRpcError>((subscriber) => {
      window.ethereum.on('disconnect', (error) => {
        this.ngZone.run(() => subscriber.next(error as IProviderRpcError));
      });
    });
  }

  chainChanged$(): Observable<number> {
    return new Observable<number>((subscriber) => {
      window.ethereum.on('chainChanged', (chainId) => {
        this.ngZone.run(() => subscriber.next(Number(chainId as string)));
      });
    });
  }

  accountsChanged$(): Observable<string[]> {
    return new Observable<string[]>((subscriber) => {
      window.ethereum.on('accountsChanged', (accounts) => {
        this.ngZone.run(() => subscriber.next(accounts as string[]));
      });
    });
  }
}
