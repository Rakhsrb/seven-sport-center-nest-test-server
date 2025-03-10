import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainerService } from './trainer.service';
import { TrainerController } from './trainer.controller';
import { Trainer, TrainerSchema } from './schemas/trainer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Trainer.name, schema: TrainerSchema }]),
  ],
  controllers: [TrainerController],
  providers: [TrainerService],
})
export class TrainerModule {}
