import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { IpfsController } from "./ipfs/ipfs.controller";
import { IpfsService } from "./ipfs/ipfs.service";
import { EthController } from "./eth/eth.controller";
import { EthService } from "./eth/eth.service";
import { getEnvPath } from "./common/helper/env.helper";

const envFilePath: string = getEnvPath(`${__dirname}/common/env`);

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath,
            isGlobal: true,
        }),
    ],
    controllers: [IpfsController, EthController],
    providers: [IpfsService, EthService],
})
export class AppModule {}
