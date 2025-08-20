import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from 'src/task/models/task';

export class TaskDto {
  @ApiProperty({ example: 'b8f8e6f5-4e23-4f3b-bef3-2b5d43f3e8b5' })
  id: string;

  @ApiProperty({ example: 'Finish NestJS project' })
  title: string;

  @ApiProperty({
    example: 'Complete all CRUD endpoints and write tests',
    required: false,
  })
  description?: string;

  @ApiProperty({ enum: TaskStatus, example: TaskStatus.TODO })
  status: TaskStatus;

  @ApiProperty({ example: '2025-08-11T07:48:53.000Z' })
  createdAt: Date;
}
