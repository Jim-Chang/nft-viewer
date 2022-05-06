import { TBaseContract } from './../contracts/base-contract';
import { Injectable } from '@angular/core';
import { BaseContract } from 'Lib/contracts/base-contract';
import { from, Observable } from 'rxjs';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root',
})
export class Web3ProviderService {
  private LOCAL_PROVIDER = 'http://localhost:8545';
  private web3: Web3;

  constructor() {
    this.web3 = new Web3(Web3.givenProvider || this.LOCAL_PROVIDER);
    console.log('web3 provider', this.web3, Web3.givenProvider);
  }

  requestAccounts(): Observable<string[]> {
    return from(this.web3.eth.requestAccounts());
  }

  getAccounts(): Observable<string[]> {
    return from(this.web3.eth.getAccounts());
  }

  getBlock(index: number): Observable<any> {
    return from(this.web3.eth.getBlock(index));
  }

  getContract(contractCls: TBaseContract, address: string): BaseContract {
    return new contractCls(this.web3, address);
  }
}
