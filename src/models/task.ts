export interface Task {
  id?: number
  projectId: number
  title: string
  description?: string
  completedAt?: Date
  startAt?: Date
  endAt?: Date
}
