# NFT Viewer

View NFT directly from blockchain.  
NFT will not be delisted as long as it is still on the blockchain!

This is an experimental project.
Just want to know if it is possible to browse NFTs in a decentralized way.  
If it can, how about performance?  
That's why I want to try.
## Development Server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## CORS Proxy Server
Because some URIs are hosted on centrialize servers. It will have CORS issue because domain is not the same. I use [CORS Anywhere](https://github.com/Rob--W/cors-anywhere) to solve this problem.  

Run `node cors-anywhere/cors-anywhere.js` for CORS proxy server. It will listen 8080 port.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Env
If you want to use Infura api to support web2 browser, you can create `.env` file at root folder and add `NG_APP_INFURA_PROJ_ID` like this

```
NG_APP_INFURA_PORJ_ID=<your_infura_proj_id>
```

## Demo Website
You can see the website hosting on IPFS here.  
https://nft-viewer-ipfs.koding.work  

If slow, you can use this hosting on Fleek.  
https://nft-viewer.koding.work
