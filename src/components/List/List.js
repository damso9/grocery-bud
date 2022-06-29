import React from "react";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

import "./List.css";
export const List = ({ id, todoItem, deleteItem, editItem,index }) => {
  return (
    <>
      <article className="list">
        <p>{todoItem}</p>
        <aside className="icons">
          <FiEdit className="edit-icon" 
          onClick={() => {
            editItem(id, todoItem)
          }}/>
          <MdDelete
            className="delete-icon"
            onClick={() => {
              deleteItem(id);
            }}
          />
        </aside>
      </article>
    </>
  );
};
