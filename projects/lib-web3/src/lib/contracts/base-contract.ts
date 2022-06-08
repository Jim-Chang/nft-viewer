import Web3 from 'web3';
import Contract from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';

export type TBaseContract = new (web3: Web3, address: string) => BaseContract;

export abstract class BaseContract {
  protected web3: Web3;
  protected web3Contract: Contract.Contract;
  protected _address: string;

  protected abstract get abi(): AbiItem | AbiItem[];

  constructor(web3: Web3, address: string) {
    this.web3 = web3;
    this._address = address;
    this.initContract();
  }

  get address(): string {
    return this._address;
  }

  private initContract(): void {
    this.web3Contract = new this.web3.eth.Contract(this.abi, this._address);
  }
}
