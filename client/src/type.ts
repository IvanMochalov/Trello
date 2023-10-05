export type Board = {
  id: string
  name: string
  tacksList?: TacksList
}

export type TacksList = {
  id: string
  listName: string
  listSteps?: string[]
}
