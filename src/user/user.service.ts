import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(
    registerUserDto: RegisterUserDto,
  ): Promise<{ message: string }> {
    const { phoneNumber, password } = registerUserDto;

    const existingUser = await this.userModel.findOne({ phoneNumber }).exec();
    if (existingUser) {
      throw new BadRequestException(
        'Пользователь с таким номером телефона уже существует',
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      ...registerUserDto,
      password: hashedPassword,
    });
    await newUser.save();

    return { message: 'новый пользователь успешно зарегистрирован' };
  }

  async login(
    phoneNumber: string,
    password: string,
  ): Promise<{ token: string; message: string }> {
    const user = await this.userModel.findOne({ phoneNumber }).exec();
    if (!user)
      throw new UnauthorizedException('Недействительные учетные данные');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Недействительные учетные данные');

    const token = this.jwtService.sign({
      userId: user._id,
      phoneNumber: user.phoneNumber,
    });
    return { token, message: 'Вы успешно вошли в свою учетную запись' };
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException('Пользователь не найден');
    return user;
  }

  async updateUser(id: string, userDto: UpdateUserDto): Promise<User> {
    if (userDto.password) {
      const existingUser = await this.userModel.findById(id).exec();
      if (!existingUser) throw new NotFoundException('Пользователь не найден');
      userDto.password = await bcrypt.hash(userDto.password, 10);
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, userDto, { new: true })
      .exec();
    if (!updatedUser) throw new NotFoundException('Пользователь не найден');
    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Пользователь не найден');
  }

  async profile(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException('Пользователь не найден');
    return user;
  }
}
