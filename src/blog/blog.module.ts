import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';

@Module({
  providers: [BlogService],
})
export class BlogModule {}
