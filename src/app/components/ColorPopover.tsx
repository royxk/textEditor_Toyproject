import React from "react";

interface ColorPopoverProps {
  colors: { value: string; text: string }[];
  onSelect: (color: string) => void;
  onClose: () => void;
}

const ColorPopover: React.FC<ColorPopoverProps> = ({
  colors,
  onSelect,
  onClose,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        zIndex: 1,
        background: "white",
        border: "1px solid #ccc",
        padding: "10px",
      }}
    >
      {colors.map((color, index) => (
        <div
          key={index}
          className="p-2 cursor-pointer hover:bg-gray-100"
          style={{ backgroundColor: color.value }}
          onClick={() => {
            console.log("color", color.value);
            onSelect(color.value);
            onClose();
          }}
        >
          {color.text}
        </div>
      ))}
    </div>
  );
};

export default ColorPopover;
