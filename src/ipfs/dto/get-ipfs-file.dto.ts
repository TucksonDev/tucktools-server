import { IsNotEmpty, IsString } from "class-validator";

export class GetIpfsFileDto {
    @IsNotEmpty()
    @IsString()
    cid: string;
}
