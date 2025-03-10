import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Trainer } from './schemas/trainer.schema';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';

@Injectable()
export class TrainerService {
  constructor(
    @InjectModel(Trainer.name) private trainerModel: Model<Trainer>,
  ) {}

  async createTrainer(createTrainerDto: CreateTrainerDto): Promise<Trainer> {
    const newTrainer = new this.trainerModel(createTrainerDto);
    return newTrainer.save();
  }

  async getAllTrainers(): Promise<Trainer[]> {
    return this.trainerModel.find().exec();
  }

  async getTrainerById(id: string): Promise<Trainer> {
    const trainer = await this.trainerModel.findById(id).exec();
    if (!trainer) throw new NotFoundException('Тренер не найден');
    return trainer;
  }

  async updateTrainer(
    id: string,
    updateTrainerDto: UpdateTrainerDto,
  ): Promise<Trainer> {
    const updatedTrainer = await this.trainerModel
      .findByIdAndUpdate(id, updateTrainerDto, { new: true })
      .exec();

    if (!updatedTrainer) throw new NotFoundException('Тренер не найден');
    return updatedTrainer;
  }

  async deleteTrainer(id: string): Promise<void> {
    const result = await this.trainerModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Тренер не найден');
  }
}
