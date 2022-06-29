import React from "react";

import "./Alert.css";
export const Alert = ({ addedItem, deletedItem, emptiedTodo, confirmedEdit }) => {
  return (
    <section className="alert">
      {addedItem && <p className="add">Item Added to the List</p>}
      {emptiedTodo && <p className="delete">Empty List</p>}
      {deletedItem && <p className="delete">Item Removed</p>}
      {confirmedEdit && <p className="add">Value changed!</p>}

    </section>
  );
};
