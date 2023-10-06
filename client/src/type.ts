export type Board = {
  id: number
  name: string
  tasksList?: Task[]
}

export type Task = {
  id: number
  listName: string
  listSteps?: Step[]
}

export type Step = {
  id: number
  stepDescription: string
}
