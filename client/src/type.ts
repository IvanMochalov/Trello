export type Board = {
  id: number
  name: string
  tasksList?: Task[]
}

export type Task = {
  id: number
  listName: string
  listSteps?: string[]
}
