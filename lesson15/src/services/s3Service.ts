import S3, { ManagedUpload } from  'aws-sdk/clients/s3';
import { config } from '../config/config';
import {UploadedFile} from 'express-fileupload';
import path from  'path';
import {v4 as uuidv4} from 'uuid';

class S3Service{
    Bucket;

    constructor() {
     this.Bucket = new S3({
         region: config.S3_REGION,
         accessKeyId: config.S3_ACCESS_KEY,
         secretAccessKey: config.S3_SECRET_KEY
     })
    }

   async uploadFile(file: UploadedFile, itemType: string, itemId: number): Promise<ManagedUpload.SendData>{
        const uploadFilePath = this.fileNameBuilder(file.name, itemType, itemId);

       return await this.Bucket.upload({
            Bucket: config.S3_NAME as string,
            Body: file.data,
            Key: uploadFilePath,
            ContentType: file.mimetype,
            ACL: 'public-read'
            })
            .promise() //!!!!!!!!обязательно
    }

    private fileNameBuilder(fileName: string, itemType: string, itemId: number): string{
        const fileExtension = path.extname(fileName); //.png
        return `${itemType}/${itemId}/${uuidv4()}${fileExtension}`
    }

}

export const s3Service = new S3Service();