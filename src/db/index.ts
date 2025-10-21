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
}

export const db = new MyAppDB()
