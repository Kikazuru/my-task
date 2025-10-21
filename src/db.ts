import Dexie, { type Table } from 'dexie'

export interface Project {
  id?: number
  name: string
}

export class MyAppDB extends Dexie {
  projects!: Table<Project, number>

  constructor() {
    super('MyAppDB')
    this.version(1).stores({
      projects: '++id, name',
    })
  }
}

export const db = new MyAppDB()
