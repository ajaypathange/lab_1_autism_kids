import React, { useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import DropZone from "./DropZone";
import ScoreBoard from "./ScoreBoard";
import { itemsData } from "../data/itemsData";

function GameBoard() {
  const [items, setItems] = useState(itemsData);
  const [shapes, setShapes] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [score, setScore] = useState(0);

  const handleDragEnd = (result) => {
    const { destination, draggableId } = result;
    if (!destination) return;

    const draggedItem = items.find((item) => item.id === draggableId);
    if (!draggedItem) return;

    if (destination.droppableId === "shapes" && draggedItem.type === "shape") {
      setShapes((prev) => [...prev, draggedItem]);
      setItems((prev) => prev.filter((i) => i.id !== draggedItem.id));
      setScore((prev) => prev + 1);
    } 
    else if (destination.droppableId === "numbers" && draggedItem.type === "number") {
      setNumbers((prev) => [...prev, draggedItem]);
      setItems((prev) => prev.filter((i) => i.id !== draggedItem.id));
      setScore((prev) => prev + 1);
    }
  };

  return (
    <>
      <ScoreBoard score={score} total={itemsData.length} />

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="zones-container">
          <DropZone id="items" title="Items to Sort" items={items} />
          <DropZone id="shapes" title="Shapes Box" items={shapes} />
          <DropZone id="numbers" title="Numbers Box" items={numbers} />
        </div>
      </DragDropContext>

      {items.length === 0 && (
        <h2 className="success-message">🎉 Great job! You sorted all correctly!</h2>
      )}
    </>
  );
}

export default GameBoard;
