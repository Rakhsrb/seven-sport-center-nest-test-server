import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { JwtAuthGuard } from 'src/user/auth/jwt-auth.guard';

@Controller('trainers')
export class TrainerController {
  constructor(private readonly trainerService: TrainerService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createTrainerDto: CreateTrainerDto) {
    return this.trainerService.createTrainer(createTrainerDto);
  }

  @Get()
  getAll() {
    return this.trainerService.getAllTrainers();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.trainerService.getTrainerById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateTrainerDto: UpdateTrainerDto) {
    return this.trainerService.updateTrainer(id, updateTrainerDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: string) {
    return this.trainerService.deleteTrainer(id);
  }
}
