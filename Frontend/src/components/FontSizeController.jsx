import React, { useState } from "react";

const FontSizeController = () => {
  const [fontSize, setFontSize] = useState(16);

  const increaseFontSize = () => setFontSize(fontSize + 2);
  const decreaseFontSize = () => setFontSize(Math.max(fontSize - 2, 12));

  return (
    <div style={{ textAlign: "right", margin: "10px" }}>
      <button onClick={decreaseFontSize} style={{ marginRight: "10px" }}>
        A-
      </button>
      <button onClick={increaseFontSize}>A+</button>
      <style>
        {`
          :root {
            font-size: ${fontSize}px;
          }
        `}
      </style>
    </div>
  );
};

export default FontSizeController;
