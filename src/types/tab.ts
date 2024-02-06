import type { ReactElement } from "react"

export type SelectedTabType = "kanvas" | "kuvasuhde" | "muokkaa"

export interface TabItem {
  id: SelectedTabType
  icon: ReactElement
}
