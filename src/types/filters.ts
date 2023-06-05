import type { filters } from "fabric"

export type FilterIdType =
  | "Brightness"
  | "Contrast"
  | "Noise"
  | "Saturation"
  | "Vibrance"
  | "Blur"

export type FilterListType = 
  | filters.Brightness
  | filters.Contrast
  | filters.Noise
  | filters.Saturation
  | filters.Vibrance
  | filters.Pixelate
  | filters.Blur

export type LowercaseFilterIdType = Lowercase<FilterIdType>

export type FilterControlType = {
  id: FilterIdType
  min: number
  max: number
  step: number
  newFilter: (value: number) => filters.BaseFilter
}
