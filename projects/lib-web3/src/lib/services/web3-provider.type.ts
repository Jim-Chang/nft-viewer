import { MetaMaskInpageProvider } from '@metamask/providers';

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

export type TConnectInfo = {
  chainId: string;
};

export type TTransaction = {
  blockNumber: number;
  gasUsed: number;
  transactionHash: string;
  transactionIndex: string;
  status: boolean;
};

export interface IProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}

export const CHAIN_ID_NAME_MAP: { [id: number]: string } = {
  1: 'Ethereum Mainnet',
  3: 'Ropsten Test Network',
  4: 'Rinkeby Test Network',
  5: 'Goerli Test Network',
  42: 'Kovan Test Network',
  56: 'Binance Smart Chain Mainnet',
  137: 'Polygon Mainnet',
  80001: 'Polygon Mumbain Test Network',
};
