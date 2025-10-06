import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import ItemCard from "./ItemCard";

const DropZone = ({ droppableId, title, items }) => {
  return (
    <div className="dropzone-container">
      <h3>{title}</h3>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div
            className="dropzone"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {items.map((item, index) => (
              <ItemCard key={item.id} item={item} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default DropZone;
