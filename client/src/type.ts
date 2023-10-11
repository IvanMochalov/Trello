export type TStep = {
  id: string
  content: string
  position: number
}

export type TTask = {
  id: string
  title: string
  stepIds: string[]
  position: number
}

export type TBoard = {
  id: string
  title: string
  taskIds: string[]
  position: number
}

export type TInitialData = {
  boardOrder: string[]
  boards: {
    [key: string]: TBoard
  }
  steps: {
    [key: string]: TStep
  }
  tasks: {
    [key: string]: TTask
  }
}
