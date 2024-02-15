import type { ReactElement } from "react"

export type SelectedTabType = "kollaasi" | "kuvasuhde" | "muokkaa"

export interface TabItem {
  id: SelectedTabType
  icon: ReactElement
}
