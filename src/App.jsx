import { useState } from "react";
import { Layer, Stage } from "react-konva";
import Rectangle from "./Rectangle";
const initialRectangles = [
  {
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    fill: "red",
    id: "rect1",
  },
  {
    x: 150,
    y: 10,
    width: 100,
    height: 100,
    fill: "green",
    id: "rect2",
  },
];
export default function App() {
  const [rectangles, setRectangles] = useState(initialRectangles);
  const [selectedId, setSelectedId] = useState(null);

  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedId(null);
    }
  };
  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}
    >
      <Layer>
        {rectangles.map((rect, i) => (
          <Rectangle
            key={i}
            shapeProps={rect}
            isSelected={rect.id === selectedId}
            onSelect={() => setSelectedId(rect.id)}
            onChange={(newAttrs) => {
              const updatedRectangles = rectangles.map((r, index) =>
                index === i ? newAttrs : r
              );
              setRectangles(updatedRectangles);
            }}
          />
        ))}
      </Layer>
    </Stage>
  );
}
