import type { Task } from '@/models/task'
import type Dexie from 'dexie'
import { db } from '..'

interface ITask {
  create(task: Task): Promise<void>
}

class TaskRepository implements ITask {
  private db: Dexie.Table<Task, Task['id']>

  constructor(db: Dexie.Table<Task, Task['id']>) {
    this.db = db
  }
  async create(task: Task): Promise<void> {
    await this.db.add(task)
  }

  async listByProject(projectId: number): Promise<Task[]> {
    return await this.db.where('projectId').equals(projectId).toArray()
  }
}

export default new TaskRepository(db.tasks)
