import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dtos/request/create.task.dto';
import { UpdateTaskDto } from './dtos/request/update.task.dto';
import { TaskDto } from './dtos/response/task.dto';
import express from 'express';

@ApiTags('Tasks')
@Controller('api/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of all tasks',
    type: [TaskDto],
  })
  async getTasks(@Res() response: express.Response) {
    const tasks = await this.taskService.findAll();

    response.status(HttpStatus.OK).json(tasks);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get task by ID' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Task found',
    type: TaskDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Task not found',
  })
  async getTaskById(
    @Param('id') id: string,
    @Res() response: express.Response,
  ) {
    const task = await this.taskService.findOne(id);
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    response.status(HttpStatus.OK).json(task);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Task successfully created',
    type: TaskDto,
  })
  async createTask(
    @Body() createDto: CreateTaskDto,
    @Res() response: express.Response,
  ) {
    const task = await this.taskService.create(createDto);
    response.status(HttpStatus.OK).json(task);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a task by ID' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Task successfully updated',
    type: TaskDto,
  })
  async updateTask(
    @Param('id') id: string,
    @Body() updateDto: UpdateTaskDto,
    @Res() response: express.Response,
  ) {
    const task = await this.taskService.update(id, updateDto);
    response.status(HttpStatus.OK).json(task);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task by ID' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Task successfully deleted',
  })
  async deleteTask(@Param('id') id: string, @Res() response: express.Response) {
    await this.taskService.remove(id);
    response.status(HttpStatus.OK);
  }
}
