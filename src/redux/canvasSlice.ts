import { CanvasStateType, SelectedTabType } from "@/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { Canvas } from "fabric"
import { BorderSettingsType } from "@/types/border"

import { createSelector } from '@reduxjs/toolkit';
import { RootStateType } from './store';

const defaultState: CanvasStateType & BorderSettingsType = {
  canvas: null,
  ratio: 0,
  template: 0,
  tab: "kollaasi",
  addBorder: false,
  borderColor: "#FFFFFF",
  borderThickness: 2
}

export const canvasSlice = createSlice({
  name: "canvas",
  initialState: defaultState,
  reducers: {
    changeTemplateByIndex: (state, action: PayloadAction<number>) => {
      state.template = action.payload
    },
    changeRatioByIndex: (state, action: PayloadAction<number>) => {
      state.ratio = action.payload
    },
    changeTab: (state, action: PayloadAction<SelectedTabType>) => {
      state.tab = action.payload
    },
    setCanvas: (state, action: PayloadAction<Canvas>) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.canvas = action.payload
    },
     // New reducers for border settings
     setAddBorder: (state, action: PayloadAction<boolean>) => {
      state.addBorder = action.payload;
    },
    setBorderColor: (state, action: PayloadAction<string>) => {
      state.borderColor = action.payload;
    },
    setBorderThickness: (state, action: PayloadAction<number>) => {
      state.borderThickness = action.payload;
    },
  },
})

export const selectCanvasState = (state: RootStateType) => state.canvas;

export const selectBorderSettings = createSelector(
  selectCanvasState,
  (canvasState) => ({
    addBorder: canvasState.addBorder,
    borderColor: canvasState.borderColor,
    borderThickness: canvasState.borderThickness,
  })
);

export const {
  changeTemplateByIndex,
  changeRatioByIndex,
  changeTab,
  setCanvas,
  setAddBorder,
  setBorderColor,
  setBorderThickness,
} = canvasSlice.actions

export default canvasSlice.reducer
