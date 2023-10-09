// export type Board = {
//   id: number
//   name: string
//   tasksList?: Task[]
// }

// export type Task = {
//   id: number
//   listName: string
//   listSteps?: Step[]
// }

// export type Step = {
//   id: number
//   stepDescription: string
// }

export interface Step {
  id: string
  content: string
}

export interface Task {
  id: string
  title: string
  stepIds: string[]
}

export interface Board {
  id: string
  title: string
  stepIds: string[]
}

export interface initialData {
  boardOrder: string[]
  boards: {
    [key: string]: Board
  }
  tasks: {
    [key: string]: Task
  }
  steps: {
    [key: string]: Step
  }
}
