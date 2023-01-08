import { ConfigService } from "@nestjs/config";
const configService = new ConfigService();

// EVM Networks
export enum Networks {
    ETH_MAINNET = 1,
    ETH_GOERLI = 5,
    POLYGON_MAINNET = 137,
}

export const networkIsValid = (networkId: number): boolean => {
    return Object.values(Networks).includes(networkId);
};

// https://docs.ethers.io/v5/api/providers/api-providers/#AlchemyProvider
export const getNetworkFromId = (networkId: number): string => {
    let network = null;

    switch (networkId) {
        case Networks.ETH_MAINNET:
            network = "homestead";
            break;
        case Networks.ETH_GOERLI:
            network = "goerli";
            break;
        case Networks.POLYGON_MAINNET:
            network = "matic";
    }

    return network;
};

export const getAlchemyApiKeyFromNetworkId = (networkId: number): string => {
    let apiKey = null;

    switch (networkId) {
        case Networks.ETH_MAINNET:
            apiKey = configService.get("ETH_ALCHEMY_MAINNET_APIKEY");
            break;
        case Networks.ETH_GOERLI:
            apiKey = configService.get("ETH_ALCHEMY_GOERLI_APIKEY");
            break;
        case Networks.POLYGON_MAINNET:
            apiKey = configService.get("POLYGON_ALCHEMY_MAINNET_APIKEY");
            break;
    }

    return apiKey;
};
