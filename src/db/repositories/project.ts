import type { Project } from '@/models/project'
import type Dexie from 'dexie'
import { db } from '..'

interface IPagination {
  page: number
  limit: number
}

interface IProjectRepository {
  create(project: Project): Promise<void>
  remove(id: Project['id']): Promise<void>
  list(pagination: IPagination): Promise<Project[]>
  count(): Promise<number>
}

class ProjectRepository implements IProjectRepository {
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

  async list(pagination: IPagination): Promise<Project[]> {
    return await this.db
      .offset((pagination.page - 1) * pagination.limit)
      .limit(pagination.limit)
      .toArray()
  }

  async count(): Promise<number> {
    return await this.db.count()
  }

  async detail(id: Project['id']) {
    return await this.db.get(id)
  }
}

export default new ProjectRepository(db.projects)
