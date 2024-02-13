import type { FilterControlType, FilterIdType } from "@/types"
import { filters } from "@/constants/filters"
import { useState, useEffect } from "react"

import FilterControl from "@/components/Filter/FilterSliderInput"
import clsx from "clsx"

export default function TabFilters() {
  const [isMobile, setIsMobile] = useState(false)
  const [activeFilter, setActiveFilter] = useState<FilterIdType | null>(null)
  const [addOutline, setAddOutline] = useState(false); // State to track whether outline should be added

  const handleOutlineChange = (event) => {
    setAddOutline(event.target.checked);
  };

  // Function to handle color selection
  const handleColorChange = (color) => {
    // Use the selected color
  };

  // Function to handle thickness selection
  const handleThicknessChange = (event) => {
    const thickness = event.target.value;
    // Use the selected thickness
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

  return (
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
       {/* Checkbox for adding outline */}
      <div>
        <input
          type="checkbox"
          checked={addOutline}
          onChange={handleOutlineChange}
        />
        <label>Lisää reuna</label>
      </div>
      {/* Color picker for outline color */}
      {addOutline && (
        <div>
          <label>Reunan väri:</label>
          <input
            type="color"
            onChange={(e) => handleColorChange(e.target.value)}
          />
        </div>
      )}
      {/* Slider for outline thickness */}
      {addOutline && (
        <div>
          <label>Reunan paksuus:</label>
          <input
            type="range"
            min="1"
            max="10"
            onChange={handleThicknessChange}
          />
        </div>
      )}
    </div>
  )
}
