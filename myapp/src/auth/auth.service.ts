// src/auth/auth.service.ts
import { Injectable, UnauthorizedException} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Prisma } from 'generated/prisma';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10); // hash password:contentReference[oaicite:11]{index=11}
    const user = await this.prisma.user.create({
      data: { ...dto, password: hashedPassword },
    });
    return { id: user.id, email: user.email, name: user.name };
  }

  async login(dto: LoginUserDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email }});
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, username: user.email, role: user };
    // Issue JWT with jwtService, returning { access_token: '...' }:contentReference[oaicite:12]{index=12}
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
