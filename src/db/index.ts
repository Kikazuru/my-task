import { type Project } from '@/models/project'
import type { Task } from '@/models/task'
import Dexie, { type Table } from 'dexie'

export class MyAppDB extends Dexie {
  projects!: Table<Project, Project['id']>
  tasks!: Table<Task, Task['id']>

  constructor() {
    super('MyAppDB')
    this.version(2).stores({
      projects: '++id, name',
      tasks: '++id, projectId, title, completedAt',
    })
  }
}

export const db = new MyAppDB()
