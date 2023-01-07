# TuckTools Backend API
Backend API service for TuckTools Web3 application, [found here](https://github.com/TucksonDev/tucktools).

## Description
This API offers access to token gated third party services, in an attempt to hide authentication credentials while allowing access to external useful services like IPFS or Alchemy.

## Services
For now, two services are offered:
- IPFS, endpoint `/ipfs` : Upload and fetch data from IPFS through any node that allow these operations.
- ETH through Alchemy, endpoint `/eth` : Interact with any EVM blockchain through an Alchemy node. Only mainnet and goerli are currently configured.

## Disclaimer
These tools have been created to demonstrate my technical skills. They have all been thoroughly tested by me, but no third party has been involved in testing/auditing any of the code. Please keep this in mind when using them, as I am not responsible for any misuse of, or damage caused by, these tools.

# Technical specifications
- Base technologies for this project are: NestJS + Typescript, using the standard NestJS scaffolding tool. More info [here](https://docs.nestjs.com/).
- To handle blockchain operations, the project uses ethers through an Alchemy node. For now, only mainnet and goerli are supported.
- IPFS is accessed through the official library ipfs-http-client.
- You may have a .env, development.env and a production.env file in `src/common/env` folder. `.env` will act as the final fallback in case neither production or development are found. You can see the format for those files in `src/common/env/.env.example`.
- This API does not have any authentication module. For now it is intended to be accessed from the same machine as the frontend. As both ends develop, it is expected to have its own machine and use some authentication method to be accessed.

# CLI instructions
- `npm install` : To install all dependencies
- `npm run start:dev` : To initialize the web server daemon for development
- `npm run start:prod` : To initialize the web server daemon in production mode
- `npm run lint` : To view linting and formatting problems on the project
- `npm run lint:fix` : To fix linting and formatting problems on the project
- `npm run build` : To generate and pack production files

# References
- NestJS: https://docs.nestjs.com/
- Ethers: https://docs.ethers.io/v5/
- IPFS: https://github.com/ipfs/js-ipfs/tree/master/packages/ipfs-http-client , https://js.ipfs.io/

