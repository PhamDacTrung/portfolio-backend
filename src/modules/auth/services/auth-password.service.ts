import { INJECTION_SERVICE_TOKEN, UserRole } from '@common/enums';
import { AuthPayload, IAccessToken } from '@common/interfaces';
import { User } from '@entities';
import { IContactService } from '@modules/contact/interfaces';
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import {
  AuthTokenDto,
  LoginInputDto,
  RegisterInputDto,
  RegisterResponseDto,
} from '../dtos';
import { IAuthService } from '../interfaces';

@Injectable()
export class AuthPasswordService implements IAuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,

    @Inject(INJECTION_SERVICE_TOKEN.CONTACT_SERVICE)
    private readonly contactService: IContactService,
  ) {}

  async validateUserById(userId: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }

    return user;
  }

  async register(input: RegisterInputDto): Promise<RegisterResponseDto> {
    try {
      // check if user exists
      const email = await this.userRepository.findOneBy({ email: input.email });
      if (email) {
        throw new BadRequestException('User email already exists');
      }

      const userName = await this.userRepository.findOneBy({
        name: input.name,
      });
      if (userName) {
        throw new BadRequestException('User name already exists');
      }

      // hash password
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(input.password, salt);

      const createUser = this.userRepository.create({
        ...input,
        role: UserRole.USER,
        password: hashPassword,
      });

      const newUser = await this.userRepository.save(createUser);
      if (!newUser) {
        throw new BadRequestException('Cannot create user');
      }

      await this.contactService.createOrUpdate(newUser.id, {
        email: input.email,
      });

      return plainToInstance(RegisterResponseDto, newUser);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async login(input: LoginInputDto): Promise<AuthTokenDto> {
    try {
      const user = await this.userRepository.findOneBy({ email: input.email });
      if (!user) {
        throw new BadRequestException('User not found');
      }

      const isMatch = await bcrypt.compare(input.password, user.password);
      if (!isMatch) {
        throw new BadRequestException('Wrong password');
      }

      // payload
      const payload: AuthPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      const accessToken = this.generateAccessToken(payload).accessToken;

      return plainToInstance(AuthTokenDto, { accessToken });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  private generateAccessToken(payload: AuthPayload): IAccessToken {
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
