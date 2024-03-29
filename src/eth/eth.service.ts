import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ethers } from "ethers";
import { getNetworkFromId, getAlchemyApiKeyFromNetworkId } from "../common/helper/blockchain.helper";

@Injectable()
export class EthService {
    private ethClient: ethers.providers.AlchemyProvider;

    async initialize(networkId: number) {
        const networkName = getNetworkFromId(networkId);
        const alchemyApiKey = getAlchemyApiKeyFromNetworkId(networkId);
        if (!networkName || !alchemyApiKey) {
            throw new BadRequestException("Network ID is not valid");
        }

        this.ethClient = new ethers.providers.AlchemyProvider(networkName, alchemyApiKey);
    }

    async findTransaction(hash: string): Promise<any> {
        try {
            const transaction = await this.ethClient.getTransaction(hash);
            if (!transaction) {
                throw new NotFoundException();
            }

            return transaction;
        } catch (error) {
            throw error;
        }
    }
}
