import { IsNotEmpty, IsString } from "class-validator";

export class GetEthTransactionDto {
    @IsNotEmpty()
    @IsString()
    networkId: string;

    @IsNotEmpty()
    @IsString()
    hash: string;
}
