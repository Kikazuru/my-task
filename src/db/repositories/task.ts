import type { Task } from '@/models/task'
import type Dexie from 'dexie'
import { db } from '..'

interface ITask {
  create(task: Task): Promise<void>
  update(id: Task['id'], updates: Partial<Task>): Promise<void>
  remove(id: Task['id']): Promise<void>
  removeByProject(projectId: number): Promise<void>
  listByProject(projectId: number): Promise<Task[]>
}

class TaskRepository implements ITask {
  private db: Dexie.Table<Task, Task['id']>

  constructor(db: Dexie.Table<Task, Task['id']>) {
    this.db = db
  }
  async create(task: Task): Promise<void> {
    await this.db.add(task)
  }

  async remove(id: Task['id']): Promise<void> {
    await this.db.delete(id)
  }

  async removeByProject(projectId: number): Promise<void> {
    await this.db.where('projectId').equals(projectId).delete()
  }

  async update(id: Task['id'], updates: Partial<Task>): Promise<void> {
    await this.db.update(id, updates)
  }

  async listByProject(projectId: number): Promise<Task[]> {
    return await this.db.where('projectId').equals(projectId).toArray()
  }
}

export default new TaskRepository(db.tasks)
