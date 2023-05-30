import * as fabric from "fabric";
import { useEffect, useRef } from "react";


export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const CANVAS_WIDTH = 576
  const CANVAS_HEIGHT = 576
  const OBJECT_LOCKED = {
    lockMovementX: true,
    lockMovementY: true,
    lockRotation: true,
    lockScalingFlip: true,
    lockScalingX: true,
    lockScalingY: true,
    lockSkewingX: true,
    lockSkewingY: true,
    hasControls: false,
    selectable: false,
  }

  useEffect(() => {
    if (canvasRef.current) {
      // 1. Setup canvas
      const canvas = new fabric.Canvas(canvasRef.current, {
        backgroundColor: "#808080",
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
        selection: false,
      })

      // 2. Setup objects & its properties
      const rectTop = new fabric.Rect({
        fill: "yellow",
        height: CANVAS_HEIGHT * 0.5,
        width: CANVAS_WIDTH,
        top: 0,
        hoverCursor: "pointer",
      }).set(OBJECT_LOCKED)

      const rectBottom = new fabric.Rect({
        fill: "blue",
        height: CANVAS_HEIGHT * 0.5,
        width: CANVAS_WIDTH + 1,
        top: CANVAS_HEIGHT + 1,
        left: -1,
        originY: "bottom",
        hoverCursor: "pointer",
      }).set(OBJECT_LOCKED)

      canvas.add(rectTop)
      canvas.add(rectBottom)
      canvas.renderAll()

      // 3. Clean up the canvas when the component unmounts
      return () => {
        canvas.dispose()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <canvas ref={canvasRef} />
}