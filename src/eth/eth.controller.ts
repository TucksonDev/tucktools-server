import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { ethers } from 'ethers';
import { networkIsValid } from 'src/common/helper/blockchain.helper';
import { GetEthTransactionDto } from './dto/get-eth-transaction.dto';
import { EthService } from './eth.service';

@Controller('eth')
export class EthController {
    constructor(private ethService: EthService) {}

    @Get('transaction/:networkId/:hash')
    async transaction(@Param() params: GetEthTransactionDto): Promise<any> {
        const networkId = Number(params.networkId);
        if (!networkId || !networkIsValid(networkId)) {
            throw new BadRequestException("Network ID is not valid");
        }

        await this.ethService.initialize(Number(params.networkId));

        if (!ethers.utils.isHexString(params.hash, 32) || !ethers.utils.isBytesLike(params.hash)) {
            throw new BadRequestException("Transaction hash does not have a valid format");
        }

        return await this.ethService.findTransaction(params.hash);
    }
}
