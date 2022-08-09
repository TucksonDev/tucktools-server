import { IsNotEmpty, IsString } from "class-validator";

export class AddIpfsFileDto {
    @IsNotEmpty()
    @IsString()
    nftName: string;

    @IsNotEmpty()
    @IsString()
    nftDescription: string;
}
