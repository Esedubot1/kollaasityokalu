import { ASPECT_RATIOS } from "@/constants/canvasConfig"
import { useAppSelector, useAppDispatch } from "@/redux/hooks"
import { changeRatioByIndex } from "@/redux/settingsSlice"
import { RootStateType } from "@/redux/store"
import toast, { Toaster } from "react-hot-toast"

export default function TabRatio() {
  const activeRatioIndex = useAppSelector(
    (state: RootStateType) => state.settings.ratio
  )
  const dispatch = useAppDispatch()

  return (
    <>
      <Toaster />
      <div className="flex flex-nowrap sm:flex-wrap place-items-start text-white">
        {ASPECT_RATIOS.map((ratio, index) => {
          return (
            <button
              key={`ratio-${index}`}
              aria-label={`change aspect ratio to ${ratio.name}`}
              className={`flex mx-1 sm:mb-2 h-20 w-20 sm:w-full md:w-[calc(50%-8px)] cursor-pointer flex-col items-center justify-center text-center transition-colors rounded ${
                index === activeRatioIndex
                  ? "bg-neutral-800"
                  : "hover:bg-neutral-800"
              }`}
              onClick={() => {
                dispatch(changeRatioByIndex(index)) 
                toast.success(`Ratio changed to ${ratio.name}`, { duration: 800, position: "top-right" })
              }}
            >
              <img src={ratio.icon} alt={ratio.name} />
              <span className="w-full text-center mt-1">{ratio.name}</span>
            </button>
          )
        })}
      </div>
    </>
  )
}
