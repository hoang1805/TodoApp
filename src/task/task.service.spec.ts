import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { AppModule } from 'src/app.module';
import { TaskStatus } from './models/task';

describe('TaskService (integration with real DB)', () => {
  let service: TaskService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add, get and delete a task successfully', async () => {
    // 1. Get all tasks
    const before = await service.findAll();
    const sizeBefore = before.length;

    // 2. Add new task
    const created = await service.create({
      title: 'Integration Task',
      description: 'Testing with sqlite',
      status: TaskStatus.IN_PROGRESS,
    });

    expect(created.id).toBeDefined();
    expect(created.title).toBe('Integration Task');
    expect(created.status).toBe(TaskStatus.IN_PROGRESS);

    // 3. Delete the task
    await service.remove(created.id);

    // 4. Ensure it was deleted
    const afterDelete = await service.findAll();
    expect(afterDelete.length).toBe(sizeBefore);
  });
});
