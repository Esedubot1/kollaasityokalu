import type { FilterControlType, FilterIdType } from "@/types"
import { filters } from "@/constants/filters"
import { useState, useEffect } from "react"
import { useCanvasImageData } from "@/hooks/useReduxData"
import { useCanvasAction } from "@/hooks/useReduxAction"

import { useSelector } from "react-redux";
import { selectBorderSettings } from "@/redux/canvasSlice";

import FilterControl from "@/components/Filter/FilterSliderInput"
import clsx from "clsx"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

export default function TabFilters() {
  const [isMobile, setIsMobile] = useState(false)
  const [activeFilter, setActiveFilter] = useState<FilterIdType | null>(null)
  const { uploadCount, maxImageUploads } = useCanvasImageData()

  const { setAddBorderAction, setBorderColorAction, setBorderThicknessAction } = useCanvasAction(); // Destructure the border settings actions

  const borderSettings = useSelector(selectBorderSettings);

  useEffect(() => {
    // Set default border to false
    setAddBorderAction(borderSettings.addBorder)
    // Set default color to white
    setBorderColorAction(borderSettings.borderColor);
    // Set default thickness to the smallest value
    setBorderThicknessAction(borderSettings.borderThickness);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOutlineChange = (event: { target: { checked: boolean; }; }) => {
    const addOutlineValue = event.target.checked;
    /* setAddOutline(addOutlineValue); */
    setAddBorderAction(addOutlineValue); // Dispatch action to update addOutline state in Redux store
  };

  /*  const handleColorChange = (color: string) => {
     setBorderColorAction(color); // Dispatch action to update color in Redux store
   }; */

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

        <div>
          <input
            type="checkbox"
            checked={borderSettings.addBorder}
            onChange={handleOutlineChange}
            style={{ transform: "scale(1.5)", marginLeft: "5px", }}
            disabled={uploadCount !== maxImageUploads}
          />

        </div>
        <label className={uploadCount !== maxImageUploads ? "text-gray-500" : ""}> Lisää reuna</label>

        {/*{borderSettings.addBorder && (
               
                  <div>
  
                    <div>
                      <label>Reunan väri:</label>
                      <input
                        type="color"
                        value={borderSettings.borderColor} // Set the value attribute to the color state
                        onChange={(e) => handleColorChange(e.target.value)}
                      />
                    </div>
  
                  </div>
                
              )}*/}
        {borderSettings.addBorder && (

          <div>
            <label>Reunan paksuus:</label>
            <input
              id={'borderThicknessSlider'}
              type="range"
              min="1"
              max="20"
              value={borderSettings.borderThickness} // Set the value attribute to the thickness state
              onChange={handleThicknessChange}
            />
          </div>

        )}


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
        {/*{borderSettings.addBorder && (
                <div>
                  <div>
                    <label>Reunan väri:</label>
                    <input
                      type="color"
                      value={borderSettings.borderColor} // Set the value attribute to the color state
                      onChange={(e) => handleColorChange(e.target.value)}
                    />
                  </div>
                </div>
            )}*/}
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
