import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { create, IPFSHTTPClient } from 'ipfs-http-client';
import { IpfsFile } from './interfaces/ipfs-file.interface';


// Is this right here?
const IPFS_BASE_URL = 'ipfs://';

@Injectable()
export class IpfsService {
    private ipfsClient: IPFSHTTPClient;

    constructor(private configService: ConfigService) {
        this.ipfsClient = create({
            protocol: this.configService.get('IPFS_GATEWAY_PROTOCOL'),
            host: this.configService.get('IPFS_GATEWAY_HOST'),
            port: Number(this.configService.get('IPFS_GATEWAY_PORT'))
        });
    }

    async uploadMetadata(ipfsFile: IpfsFile, ipfsFileBlob: Buffer): Promise<string> {
        // Upload first the image
        const imageInfo = {
            content: ipfsFileBlob
        };
        try {
            const imageIpfsResult = await this.ipfsClient.add(imageInfo);

            // Then upload the json metadata
            const metadataInfo = {
                name: ipfsFile.nftName,
                description: ipfsFile.nftDescription,
                image: IPFS_BASE_URL + imageIpfsResult.cid,
                attributes: []
            }
            const metadataIpfsResult = await this.ipfsClient.add(JSON.stringify(metadataInfo));
            
            return String(metadataIpfsResult.cid);
        } catch (error) {
            throw error;
        }
    }

    async find(cid: string): Promise<any> {
        try {
            const stream = this.ipfsClient.cat(cid);
            const decoder = new TextDecoder();
            let data = '';

            for await (const chunk of stream) {
                data += decoder.decode(chunk, {stream: true});
            }

            return data;
        } catch (error) {
            // TODO: Find a proper way to import HTTPError, cause I couldn't find it
            if (error.constructor.name == 'HTTPError') {
                throw new BadRequestException(error.message);
            }

            throw error;
        }
    }
}
