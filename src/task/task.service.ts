import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from './models/task';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dtos/request/create.task.dto';
import { UpdateTaskDto } from './dtos/request/update.task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async findOne(id: string): Promise<Task | null> {
    return await this.taskRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }

  async create(dto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create({
      title: dto.title,
      description: dto.description,
      status: dto.status,
    });

    return await this.taskRepository.save(task);
  }

  async update(id: string, dto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    Object.assign(task, dto);
    return await this.taskRepository.save(task);
  }
}
