import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { yoloClasses } from "./yolo_classes";

const ClassSelector = () => {
  const { alertClasses, setAlertClasses } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle checkbox changes
  const handleCheckboxChange = (className: string) => {
    if (alertClasses?.includes(className)) {
      setAlertClasses(alertClasses.filter((cls) => cls !== className));
    } else {
      setAlertClasses(
        alertClasses ? [...alertClasses, className] : [className]
      );
    }
  };

  return (
    <div className="relative w-[100%] sm:w-[200px]">
      {/* Dropdown Button */}
      <button
        className="p-2 border-dashed border-2 rounded-xl hover:translate-y-1 w-[100%] text-left cursor-pointer bg-white"
        type="button"
        onClick={toggleDropdown}
      >
        {alertClasses && alertClasses.length > 0
          ? `Selected: ${alertClasses.length - 1} classes`
          : "Select Classes"}
        <span style={{ float: "right" }}>{isDropdownOpen ? "▲" : "▼"}</span>
      </button>

      {/* Dropdown Content */}
      {isDropdownOpen && (
        <div
          className="absolute top-[100%] left-0 right-0 p-2 border-[1px] border-solid border-[#ccc] rounded-[4px] z-50 overflow-y-auto max-h-[300px] bg-white"
          style={{
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          {yoloClasses.map((className) => (
            <div
              key={className}
              className="bg-white"
              style={{ padding: "10px" }}
            >
              <label>
                <input
                  type="checkbox"
                  checked={alertClasses?.includes(className) || false}
                  onChange={() => handleCheckboxChange(className)}
                  style={{ marginRight: "8px" }}
                />
                {className}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClassSelector;
