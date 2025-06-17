import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { CommentsModule } from './comments/comments.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthModule, UsersModule, ProjectsModule, TasksModule, CommentsModule, ConfigModule.forRoot({
    isGlobal: true,
    // envFilePath: '.env'
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
