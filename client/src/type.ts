export type Board = {
  id: number
  name: string
  tacksList?: TacksList
}

export type TacksList = {
  id: number
  listName: string
  listSteps?: string[]
}
