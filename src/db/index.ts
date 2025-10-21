import { type Project } from '@/models/project'
import Dexie, { type Table } from 'dexie'

export class MyAppDB extends Dexie {
  projects!: Table<Project, Project['id']>

  constructor() {
    super('MyAppDB')
    this.version(1).stores({
      projects: '++id, name',
    })
  }

  add(project: Project) {
    this.projects.add(project)
  }

  remove(id: Project['id']) {
    if (!id) return
    this.projects.delete(id)
  }
}

export const db = new MyAppDB()
