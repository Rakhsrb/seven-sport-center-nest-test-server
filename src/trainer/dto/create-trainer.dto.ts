import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTrainerDto {
  @IsNotEmpty()
  photo: string;

  @IsNotEmpty()
  @IsString()
  fullname: string;

  @IsNotEmpty()
  @IsString()
  experience: string;
  
  achievements: string[];
}
