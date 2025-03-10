import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Request,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { randomBytes } from 'crypto';
import { extname } from 'path';
import { Express } from 'express';

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_, file, cb) => {
          const hash = randomBytes(16).toString('hex');
          const ext = extname(file.originalname);
          cb(null, `${hash}${ext}`);
        },
      }),
    }),
  )
  uploadFile(@Request() req, @UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return { message: 'No file uploaded' };
    }
    return {
      message: 'File uploaded successfully',
      filename: `${req.protocol}://${req.get('host')}/uploads/${file.filename}`,
    };
  }
}
