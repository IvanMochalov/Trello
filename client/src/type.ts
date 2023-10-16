export type TStep = {
  id: string
  title: string
  done: boolean
}

export type TTask = {
  id: string
  title: string
  stepIds: string[]
}

export type TBoard = {
  id: string
  title: string
  taskIds: string[]
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
