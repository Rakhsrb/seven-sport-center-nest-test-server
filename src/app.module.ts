import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrainerModule } from './trainer/trainer.module';
import { UserModule } from './user/user.module';
import { UploadModule } from './upload/upload.module';
import { BlogController } from './blog/blog.controller';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb'),
    TrainerModule,
    UserModule,
    UploadModule,
    BlogModule,
  ],
  controllers: [AppController, BlogController],
  providers: [AppService],
})
export class AppModule {}
