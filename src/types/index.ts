export type SelectedTabType = "template" | "ratio" | "more"

export type LockedObjectType = {
  lockMovementX: boolean
  lockMovementY: boolean
  lockRotation: boolean
  lockScalingFlip: boolean
  lockScalingX: boolean
  lockScalingY: boolean
  lockSkewingX: boolean
  lockSkewingY: boolean
  hasControls: boolean
  selectable: boolean
}

export type RectFabricFunctionType = (
  CANVAS_HEIGHT: number,
  CANVAS_WIDTH: number
) => {
  fill: string
  height: number
  width: number
  absolutePositioned: boolean
  hoverCursor: string
  top?: number
  left?: number
}

export type RectConfigType = {
  rectFabric: RectFabricFunctionType
}

export type CollageTemplateType = {
  name: string
  scaleTo: "width" | "height"
  config: RectConfigType[]
}

export type DimensionsType = {
  width: number
  height: number
}

export type AspectRatioType = {
  name: string
  nickname: string
  canvas: DimensionsType
}

export interface defaultSettingsType {
  template: number
  ratio: number
}
