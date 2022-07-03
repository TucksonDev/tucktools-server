import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IpfsController } from './ipfs/ipfs.controller';
import { IpfsService } from './ipfs/ipfs.service';
import { EthController } from './eth/eth.controller';
import { EthService } from './eth/eth.service';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  })],
  controllers: [IpfsController, EthController],
  providers: [IpfsService, EthService],
})
export class AppModule {}
