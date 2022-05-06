export type TTokenInfo = {
  id: number;
  owner: string;
  tokenURI: string;
  contractName: string;
  contractAddress: string;
};

export type TMetadata = {
  description: string;
  name: string;
  external_url?: string;
  image?: string;
  background_color?: string;
  animation_url?: string;
  youtube_url?: string;
  attributes: TAttribute[];
};

export type TAttribute = {
  trait_type: string;
  value: string;
};
