import type { Project } from '@/models/project'
import type Dexie from 'dexie'

export interface IProjectRepository {
  create(project: Project): Promise<void>
  remove(id: Project['id']): Promise<void>
}

export class ProjectRepository implements IProjectRepository {
  private db: Dexie.Table<Project, Project['id']>

  constructor(db: Dexie.Table<Project, Project['id']>) {
    this.db = db
  }

  async create(project: Project): Promise<void> {
    await this.db.add(project)
  }

  async remove(id: Project['id']): Promise<void> {
    await this.db.delete(id)
  }
}
