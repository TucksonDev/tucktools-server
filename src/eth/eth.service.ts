import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ethers } from 'ethers';
import { getNetworkFromId, getAlchemyApiKeyFromNetworkId } from '../helpers/blockchain.helper';

@Injectable()
export class EthService {
    private ethClient: ethers.providers.AlchemyProvider;

    async initialize(networkId: number) {
        if (!this.ethClient) {
            const networkName = getNetworkFromId(networkId);
            const alchemyApiKey = getAlchemyApiKeyFromNetworkId(networkId);
            if (!networkName || !alchemyApiKey) {
                throw new BadRequestException("Network ID is not valid");
            }

            this.ethClient = new ethers.providers.AlchemyProvider(
                getNetworkFromId(networkId),
                getAlchemyApiKeyFromNetworkId(networkId),
            );
        }
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
