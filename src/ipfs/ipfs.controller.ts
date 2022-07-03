import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { AddIpfsFileDto } from './dto/add-ipfs-file.dto';
import { GetIpfsFileDto } from './dto/get-ipfs-file.dto';
import { IpfsService } from './ipfs.service';

@Controller('ipfs')
export class IpfsController {
    constructor(private ipfsService: IpfsService) {}
    
    @Post()
    @UseInterceptors(
        FileInterceptor('fileBlob', {
            fileFilter: (req, file, cb) => {
                // Only allow images
                if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
                    cb(null, true);
                } else {
                    cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
                }
            }
        })
    )
    async uploadMetadata(
        @UploadedFile() file: Express.Multer.File,
        @Body() ipfsFileDto: AddIpfsFileDto
    ): Promise<string> {
        // TODO: I can't find a way to "require" the uploaded file as a File
        //       I can add it in the DTO as Express.Multer.File, but I can't find
        //       the right Decorator for validating it as a file (i.e. isFile()),
        //       so a string is accepted. To avoid that, let's add the validation in here.
        if (!file) {
            throw new HttpException('File is required', HttpStatus.BAD_REQUEST);
        }
        
        return await this.ipfsService.uploadMetadata(ipfsFileDto, file.buffer);
    }

    @Get(':cid')
    async find(@Param() params: GetIpfsFileDto): Promise<any> {
        return await this.ipfsService.find(params.cid);
    }
}
