import React from "react";
import { Draggable } from "@hello-pangea/dnd";

const ItemCard = ({ item, index }) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => (
        <div
          className="item-card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {item.name}
        </div>
      )}
    </Draggable>
  );
};

export default ItemCard;
