import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import ItemCard from "./ItemCard";

function DropZone({ id, title, items }) {
  return (
    <div className="drop-zone-container">
      <h2>{title}</h2>
      <Droppable droppableId={id}>
        {(provided) => (
          <div
            className="drop-zone"
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
}

export default DropZone;
