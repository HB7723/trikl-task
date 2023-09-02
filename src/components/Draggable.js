import React, { useState, useRef } from "react";

const Draggable = () => {
  const [isDraggable, setIsDraggable] = useState(true);
  const [isResizable, setIsResizable] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 150, height: 100 });
  const [text, setText] = useState("Drag me!");

  const divRef = useRef(null);

  const handleMouseDown = (e) => {
    if (!isResizable) {
      const offsetX = e.clientX - position.x;
      const offsetY = e.clientY - position.y;

      const onMove = (moveEvent) => {
        setPosition({
          x: moveEvent.clientX - offsetX,
          y: moveEvent.clientY - offsetY,
        });
      };

      const onUp = () => {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
      };

      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    }
  };

  const handleResize = (direction) => (e) => {
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = dimensions.width;
    const startHeight = dimensions.height;

    const onMove = (moveEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      if (direction === "right")
        setDimensions((dims) => ({ ...dims, width: startWidth + dx }));
      if (direction === "left")
        setDimensions((dims) => ({ ...dims, width: startWidth - dx }));
      if (direction === "top")
        setDimensions((dims) => ({ ...dims, height: startHeight - dy }));
      if (direction === "bottom")
        setDimensions((dims) => ({ ...dims, height: startHeight + dy }));
    };

    const onUp = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  const handleDoubleClick = () => {
    setIsResizable(true);
    setIsEditable(true);
    setIsDraggable(false);

    const handleGlobalDoubleClick = (e) => {
      if (!divRef.current.contains(e.target)) {
        setIsResizable(false);
        setIsDraggable(true);
        setIsEditable(false); // Close the textarea
        document.removeEventListener("dblclick", handleGlobalDoubleClick);
      }
    };

    document.addEventListener("dblclick", handleGlobalDoubleClick);
  };

  return (
    <div
      ref={divRef}
      style={{
        position: "absolute",
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
        border: isResizable ? "2px dashed black" : "none",
        cursor: isDraggable ? "grab" : "default",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "3rem",
        color: "white",
        zIndex: 10,
      }}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
    >
      {isEditable ? (
        <textarea
          style={{
            width: "80%",
            height: "80%",
            border: "none",
            outline: "none",
            padding: "10px",
            resize: "none",
            fontSize: "16px",
            fontFamily: "Arial, sans-serif",
            backgroundColor: "#f4f4f4",
          }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={() => {
            setIsEditable(false);
            setIsResizable(false);
            setIsDraggable(true);
          }}
        />
      ) : (
        text
      )}

      {isResizable && (
        <>
          <div
            style={{
              position: "absolute",
              right: 0,
              top: "50%",
              width: "10px",
              height: "10px",
              cursor: "e-resize",
              background: "black",
              transform: "translateY(-50%)",
            }}
            onMouseDown={handleResize("right")}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              width: "10px",
              height: "10px",
              cursor: "s-resize",
              background: "black",
              transform: "translateX(-50%)",
            }}
            onMouseDown={handleResize("bottom")}
          />
          <div
            style={{
              position: "absolute",
              left: 0,
              top: "50%",
              width: "10px",
              height: "10px",
              cursor: "w-resize",
              background: "black",
              transform: "translateY(-50%)",
            }}
            onMouseDown={handleResize("left")}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              width: "10px",
              height: "10px",
              cursor: "n-resize",
              background: "black",
              transform: "translateX(-50%)",
            }}
            onMouseDown={handleResize("top")}
          />
        </>
      )}
    </div>
  );
};

export default Draggable;
