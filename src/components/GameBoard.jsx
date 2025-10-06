import React, { useState, useEffect } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import DropZone from "./DropZone";
import ScoreBoard from "./ScoreBoard";
import { level1Items, level2Items } from "../data/itemsData";

const GameBoard = () => {
  const [level, setLevel] = useState(1);
  const [items, setItems] = useState(level1Items);
  const [shapes, setShapes] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [colors, setColors] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      setShowScore(true);
    }
  }, [items]);

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId) return;

    const draggedItem =
      items.find((i) => i.id === result.draggableId) ||
      shapes.find((i) => i.id === result.draggableId) ||
      numbers.find((i) => i.id === result.draggableId) ||
      colors.find((i) => i.id === result.draggableId) ||
      animals.find((i) => i.id === result.draggableId);

    if (!draggedItem) return;

    // Remove from all lists
    const removeFromList = (list) => list.filter((i) => i.id !== draggedItem.id);
    let newItems = removeFromList(items);
    let newShapes = removeFromList(shapes);
    let newNumbers = removeFromList(numbers);
    let newColors = removeFromList(colors);
    let newAnimals = removeFromList(animals);

    const correctDrop =
      (destination.droppableId === "shapes" && draggedItem.type === "shape") ||
      (destination.droppableId === "numbers" && draggedItem.type === "number") ||
      (destination.droppableId === "colors" && draggedItem.type === "color") ||
      (destination.droppableId === "animals" && draggedItem.type === "animal");

    if (correctDrop) {
      setScore((prev) => prev + 1);
    } else {
      setScore((prev) => Math.max(prev - 1, 0));
    }

    // Place in new box
    if (destination.droppableId === "shapes") newShapes = [...shapes, draggedItem];
    if (destination.droppableId === "numbers") newNumbers = [...numbers, draggedItem];
    if (destination.droppableId === "colors") newColors = [...colors, draggedItem];
    if (destination.droppableId === "animals") newAnimals = [...animals, draggedItem];

    setItems(newItems);
    setShapes(newShapes);
    setNumbers(newNumbers);
    setColors(newColors);
    setAnimals(newAnimals);
  };

  const resetLevel = () => {
    setShowScore(false);
    setScore(0);
    setShapes([]);
    setNumbers([]);
    setColors([]);
    setAnimals([]);
    setItems(level === 1 ? level1Items : level2Items);
  };

  const nextLevel = () => {
    setLevel(2);
    setShowScore(false);
    setScore(0);
    setItems(level2Items);
    setShapes([]);
    setNumbers([]);
    setColors([]);
    setAnimals([]);
  };

  return (
    <div className="game-container">
      <h1>🧩 Autism Learning Game</h1>
      <h3>Level {level}: {level === 1 ? "Shapes & Numbers" : "Colors & Animals"}</h3>
      {!showScore && <h4>Drag each item into the correct box!</h4>}

      {!showScore ? (
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="board">
            <DropZone droppableId="items" title="Items to Sort" items={items} />

            {level === 1 && (
              <>
                <DropZone droppableId="shapes" title="Shapes Box" items={shapes} />
                <DropZone droppableId="numbers" title="Numbers Box" items={numbers} />
              </>
            )}

            {level === 2 && (
              <>
                <DropZone droppableId="colors" title="Colors Box" items={colors} />
                <DropZone droppableId="animals" title="Animals Box" items={animals} />
              </>
            )}
          </div>
        </DragDropContext>
      ) : (
        <ScoreBoard
          score={score}
          total={level === 1 ? level1Items.length : level2Items.length}
          onReset={resetLevel}
          onNextLevel={nextLevel}
          level={level}
        />
        
      )}

    </div>
  );
};

export default GameBoard;
