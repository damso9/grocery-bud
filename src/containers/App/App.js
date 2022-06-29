import React, { useState, useEffect } from "react";
import { Alert } from "../../components/Alert/Alert";
import { List } from "../../components/List/List";

import "./App.css";

const getLocalStorage = () => {
  const todo = localStorage.getItem("todo");
  if (todo) {
    return JSON.parse(localStorage.getItem("todo"));
  } else {
    return [];
  }
};

function App() {
  const [todos, setTodos] = useState(getLocalStorage());
  const [todoItem, setTodoItem] = useState("");
  const [todoItemObject, setTodoItemObject] = useState({
    id: "",
    todoItem: todoItem,
  });
  const [index, setIndex] = useState(null);
  const [addedItem, setAddedItem] = useState(false);
  const [deletedItem, setDeletedItem] = useState(false);
  const [editedItem, setEditedItem] = useState(false);
  const [confirmedEdit, setConfirmedEdit] = useState(false);
  const [emptiedTodo, setEmptiedTodo] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // Function runs when form is submitted
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editedItem) {
      handleEdit();
    } else if (todoItem) {
      setTodos((prev) => {
        let id = new Date().getTime().toString();
        return [...prev, { id, todoItem }];
      });
      setShowAlert(true);
      setAddedItem(true);
      setTodoItem("");
    } else {
      console.log("hey");
    }
  };

  // clearTodo function empties the todos Array
  const clearTodo = () => {
    if (todos.length > 0) {
      setTodos([]);
      setEmptiedTodo(true);
      setShowAlert(true);
    }
  };

  // deleteItem function removes a particular Item from the array using the item ID
  const deleteItem = (inputID) => {
    const newTodo = todos.filter((todo) => {
      const { id } = todo;
      return id !== inputID;
    });
    setShowAlert(true);
    setDeletedItem(true);
    setTodos(newTodo);
  };

  // editItem functio  to edit and replace a todo Item
  const editItem = (inputID, inputTodo) => {
    setTodoItem(inputTodo);

    // const found = todos.find((todo) => {
    //   return todo.id ===
    // })
    setTodoItemObject((prev) => {
      let obj = {
        id: inputID,
        todoItem: inputTodo,
      };

      return { ...prev, ...obj };
    });
    setEditedItem(true);
  };
  const handleEdit = () => {
    // const newArray = todos.splice(index, 1, todoItemObject);
    // setTodoItem(newArray);
    setTodos(
      todos.map((todo) => {
        const { id, todoItem } = todo;
        if (id === todoItemObject.id) {
          return { id: id, todoItem: todoItemObject.todoItem };
        } else {
          return { ...todo };
        }
      })
    );

    setShowAlert(true);
    setTodoItem("");
    setConfirmedEdit(true);
  };

  // This side-effect fires when all item are cleared
  useEffect(() => {
    const setTimeoutID = setTimeout(() => {
      setShowAlert(false);
      setEmptiedTodo(false);
    }, 2000);
    return () => {
      clearTimeout(setTimeoutID);
    };
  }, [emptiedTodo]);

  // This side effect fires when an item is deleted
  useEffect(() => {
    const setTimeoutID = setTimeout(() => {
      setShowAlert(false);
      setDeletedItem(false);
    }, 2000);
    return () => {
      clearTimeout(setTimeoutID);
    };
  }, [deletedItem]);

  // This side effect fires when an item is added
  useEffect(() => {
    const setTimeoutID = setTimeout(() => {
      setShowAlert(false);
      setAddedItem(false);
    }, 2000);
    return () => {
      clearTimeout(setTimeoutID);
    };
  }, [addedItem]);

  // This side effect is fired when an item has been successfully edited
  useEffect(() => {
    const setTimeoutID = setTimeout(() => {
      setShowAlert(false);
      setConfirmedEdit(false);
      setEditedItem(false);
    }, 2000);
    return () => {
      clearTimeout(setTimeoutID);
    };
  }, [confirmedEdit]);

  // LocalStorage
  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todos));
  }, [todos]);
  return (
    <div className="container">
      {showAlert && (
        <Alert
          addedItem={addedItem}
          emptiedTodo={emptiedTodo}
          deletedItem={deletedItem}
          confirmedEdit={confirmedEdit}
        />
      )}
      <section className="app">
        <h2>Grocery Bud</h2>
        <form onSubmit={handleSubmit}>
          <div className="grocery-form">
            <input
              type="text"
              name="grocery"
              id="grocery"
              value={todoItem}
              placeholder="e.g eggs"
              onChange={(e) => {
                setTodoItem(e.target.value);
                setTodoItemObject({
                  ...todoItemObject,
                  todoItem: e.target.value,
                });
              }}
            />
            <button type="submit">{editedItem ? "Edit" : "Submit"}</button>
          </div>
        </form>
      </section>
      <section className="list-container">
        {todos.map((todo, index) => {
          return (
            <List
              key={todo.id}
              {...todo}
              deleteItem={deleteItem}
              editItem={editItem}
              index={index}
            />
          );
        })}
      </section>
      <footer>
        <p onClick={clearTodo}>Clear Items</p>
      </footer>
    </div>
  );
}

export default App;

// This was quite a challenging projects to work on
//  I did learn a lot, never underestimate the power to implemet an edit feature lol

// I learnt more about using useState and useEffect, i think i got the hang of it now
// I was a learning cure trying to implement the edit feature
// I also learn alot using local storage for data persistency
