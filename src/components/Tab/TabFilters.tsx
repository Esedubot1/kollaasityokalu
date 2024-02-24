import type { FilterControlType, FilterIdType } from "@/types"
import { filters } from "@/constants/filters"
import { useState, useEffect } from "react"
import { useCanvasImageData } from "@/hooks/useReduxData"
import { useCanvasAction } from "@/hooks/useReduxAction"

import { useSelector } from "react-redux";
import { selectBorderSettings } from "@/redux/canvasSlice";

import FilterControl from "@/components/Filter/FilterSliderInput"
import clsx from "clsx"

export default function TabFilters() {
  const [isMobile, setIsMobile] = useState(false)
  const [activeFilter, setActiveFilter] = useState<FilterIdType | null>(null)
  const [borderControlOn, setBorderControlOn] = useState(false)
  const { uploadCount, maxImageUploads } = useCanvasImageData()

  const { setAddBorderAction, setBorderThicknessAction } = useCanvasAction(); // Destructure the border settings actions

  const borderSettings = useSelector(selectBorderSettings);

  useEffect(() => {
    // Set default border to false
    setAddBorderAction(borderSettings.addBorder)
    // Set default thickness to the smallest value
    setBorderThicknessAction(borderSettings.borderThickness);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOutlineChange = (event: { target: { checked: boolean; }; }) => {
    const addOutlineValue = event.target.checked;
    /* setAddOutline(addOutlineValue); */
    setAddBorderAction(addOutlineValue); // Dispatch action to update addOutline state in Redux store
  };

  const handleThicknessChange = (event: { target: { value: any; }; }) => {
    const thickness = event.target.value;
    setBorderThicknessAction(thickness); // Dispatch action to update thickness in Redux store
  };

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.matchMedia('(max-width: 640px)').matches
      setIsMobile(isMobileView)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  if (isMobile) {
    return (
      <div>
        <div className={clsx({
          "w-full": true,
          "flex flex-nowrap": isMobile,
          "px-2": !isMobile
        })}>
          {(!borderControlOn && !activeFilter)
            ? (
              <button
                onClick={() => setBorderControlOn(true)}
                className={clsx(
                  "cursor-pointer transition-colors",
                  "min-w-20 h-20 mx-1 px-2",
                  "flex flex-col items-center justify-center text-center",
                  "rounded hover:bg-neutral-800",
                )}
                disabled={uploadCount !== maxImageUploads}
              >
                <h3 className={`w-full text-center text-sm font-medium ${uploadCount !== maxImageUploads ? "text-gray-500" : ""} `}>Reuna</h3>
              </button>
            )
            : (
              borderControlOn === true && (
                <div className="w-full flex items-center">
                  <button
                    onClick={() => setBorderControlOn(false)}
                    className={clsx(
                      "cursor-pointer",
                      "mx-1 px-1 h-20 w-16",
                      "flex flex-col items-center justify-center",
                      "rounded hover:bg-neutral-800",
                    )}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 15 15"><path fill="currentColor" fillRule="evenodd" d="M8.842 3.135a.5.5 0 0 1 .023.707L5.435 7.5l3.43 3.658a.5.5 0 0 1-.73.684l-3.75-4a.5.5 0 0 1 0-.684l3.75-4a.5.5 0 0 1 .707-.023Z" clipRule="evenodd" /></svg>
                    <span className="text-sm">Takaisin</span>
                  </button>
                  <div className="grow mx-3">
                    <div className="flex flex-row">
                      <div className="flex flex-col">
                      <h3 className="w-1/2 text-left font-medium">Lisää reuna</h3>
                        <input
                          type="checkbox"
                          checked={borderSettings.addBorder}
                          onChange={handleOutlineChange}
                          style={{ transform: "scale(1.5)", marginTop: '5px', marginRight: '40px'}}
                        />
                      </div>
                      {borderSettings.addBorder && (
                        <div className="grow mx-3">
                      <div className="flex flex-row w-full items-center transition-colors rounded">
                        <h3 className="w-1/2 text-left font-medium">Reunan paksuus</h3>
                        <span className="w-1/2 text-right">
                          {borderSettings.borderThickness}
                        </span>
                      </div>
                      <div className="w-full flex justify-center items-center">
                        <input
                          id={'borderThicknessSlider'}
                          type="range"
                          min="1"
                          max="20"
                          value={borderSettings.borderThickness} // Set the value attribute to the thickness state
                          onChange={handleThicknessChange}
                          className="w-full my-2"
                        />
                      </div>
                      </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            )
          }
            {!borderControlOn && filters.map((filter: FilterControlType, i: number) => {
              return (
                <FilterControl
                  key={`filter-${i}`}
                  id={filter.id}
                  min={filter.min}
                  max={filter.max}
                  step={filter.step}
                  newFilter={filter.newFilter}
                  isMobile={isMobile}
                  activeFilter={activeFilter}
                  setActiveFilter={setActiveFilter}
                />
              )
            })}
          </div>
      </div>
    )
  }

  return (
    <div>
      <div className="border-b border-neutral-800 py-4 px-2">
        <div className={'mb-4'}>
          <input
            type="checkbox"
            checked={borderSettings.addBorder}
            onChange={handleOutlineChange}
            style={{ transform: "scale(1.5)", marginLeft: "5px" }}
            disabled={uploadCount !== maxImageUploads}
          />
          <label className={`w-1/2 text-left font-medium ${uploadCount !== maxImageUploads ? "text-gray-500" : ""} ml-2 `}>Lisää reuna</label>
        </div>
        {borderSettings.addBorder && (
          <div>
            <div className="flex flex-row w-full items-center transition-colors rounded">
              <h3 className="w-1/2 text-left font-medium">Reunan paksuus</h3>
              <span className="w-1/2 text-right">
                {borderSettings.borderThickness}
              </span>
            </div>
            <div className="w-full flex justify-center items-center">
              {(
                <input
                  id={'borderThicknessSlider'}
                  type="range"
                  min="1"
                  max="20"
                  value={borderSettings.borderThickness} // Set the value attribute to the thickness state
                  onChange={handleThicknessChange}
                  className="w-full my-2"
                />
              )}
            </div>
          </div>
        )}
      </div>

      <div className={clsx({
        "w-full": true,
        "flex flex-nowrap": isMobile,
        "px-2": !isMobile
      })}>
        {filters.map((filter: FilterControlType, i: number) => {
          return (
            <FilterControl
              key={`filter-${i}`}
              id={filter.id}
              min={filter.min}
              max={filter.max}
              step={filter.step}
              newFilter={filter.newFilter}
              isMobile={isMobile}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
            />
          )
        })}
      </div>
    </div >

  )
}
