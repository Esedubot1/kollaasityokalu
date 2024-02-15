import { COLLAGE_TEMPLATES } from "@/constants/canvasConfig"
import { useCanvasConfigData } from "@/hooks/useReduxData"
import { useTemplateAction } from "@/hooks/useReduxAction"
//import { useState, useEffect } from "react"

import toast from "react-hot-toast"
import clsx from "clsx"

export default function TabTemplate() {
  const { activeTemplateIndex } = useCanvasConfigData()
  const { changeTemplate } = useTemplateAction()
  //const [addOutline, setAddOutline] = useState(false); // State to track whether outline should be added

/*   const handleOutlineChange = (event) => {
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


  }; */


  return (
    <>
      <div className="flex flex-nowrap sm:flex-wrap place-items-start text-white">
        {COLLAGE_TEMPLATES.map((template, index) => {
          return (
            <button
              key={`template-${index}`}
              aria-label={`vaihda kollaasi ${template.name}`}
              className={clsx(
                "cursor-pointer transition-colors rounded",
                "flex flex-col items-center justify-center text-center",
                "w-20 h-20 mx-1",
                "md:w-[calc(50%-8px)]",
                "sm:w-full sm:mb-2",
                {
                  "bg-neutral-800": index === activeTemplateIndex,
                  "hover:bg-neutral-800": index !== activeTemplateIndex,
                }
              )}
              onClick={() => {
                changeTemplate(index)
                toast.success(`Kollaasi muutettu`, { duration: 650, id: "toast-template" })
              }}
            >
              {<img src={template.icon} alt={template.name} />}
            </button>
          )
        })}
      {/*<div>
        <input
          type="checkbox"
          checked={addOutline}
          onChange={handleOutlineChange}
        />
        <label>Lisää reuna</label>
      </div>
      {addOutline && (
        <div>
          <label>Reunan väri:</label>
          <input
            type="color"
            onChange={(e) => handleColorChange(e.target.value)}
          />
        </div>
      )}
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
      )}*/}
      </div>
    </>
  )
}
