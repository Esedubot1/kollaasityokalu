import { COLLAGE_TEMPLATES } from "@/constants/canvasConfig"
import { useCanvasConfigData } from "@/hooks/useReduxData"
import { useTemplateAction, useCanvasAction } from "@/hooks/useReduxAction"
import { useState, useEffect } from "react";

import toast from "react-hot-toast"
import clsx from "clsx"

export default function TabTemplate() {
  const { activeTemplateIndex } = useCanvasConfigData()
  const { changeTemplate } = useTemplateAction()
  const { setAddBorderAction, setBorderColorAction, setBorderThicknessAction } = useCanvasAction(); // Destructure the border settings actions

  const [addOutline, setAddOutline] = useState(false); // State to track whether outline should be added

  // State to track the color, default to white
  const [color, setColor] = useState("#ffffff");

  // State to track the thickness, default to the smallest value
  const [thickness, setThickness] = useState(1);

  useEffect(() => {
    // Set default border to false
    setAddBorderAction(false)
    // Set default color to white
    setBorderColorAction("#ffffff");
    // Set default thickness to the smallest value
    setBorderThicknessAction(2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOutlineChange = (event: { target: { checked: boolean; }; }) => {
    const addOutlineValue = event.target.checked;
    setAddOutline(addOutlineValue);
    setAddBorderAction(addOutlineValue); // Dispatch action to update addOutline state in Redux store
  };

  const handleColorChange = (color: string) => {
    setBorderColorAction(color); // Dispatch action to update color in Redux store
    setColor(color)
  };

  const handleThicknessChange = (event: { target: { value: any; }; }) => {
    const thickness = event.target.value;
    setBorderThicknessAction(thickness); // Dispatch action to update thickness in Redux store
    setThickness(thickness)
  };

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
      <div>
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
            value={color} // Set the value attribute to the color state
            onChange={(e) => handleColorChange(e.target.value)}
          />
        </div>
      )}
      {addOutline && (
        <div>
          <label>Reunan paksuus:</label>
          <input
            type="range"
            min="2"
            max="20"
            value={thickness} // Set the value attribute to the thickness state
            onChange={handleThicknessChange}
          />
        </div>
      )}
      </div>
    </>
  )
}
