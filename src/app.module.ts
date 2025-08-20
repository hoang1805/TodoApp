import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { Task } from './task/models/task';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'todo.sqlite',
      entities: [Task],
      synchronize: true,
    }),
    TaskModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
