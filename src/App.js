import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [name, setname] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setisEditing] = useState(false);
  const [editId, seteditId] = useState(null);
  const [alert, setalert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      // display alert
      showAlert(true, "please enter value", "danger");
    } else if (name && isEditing) {
      // deal with edit
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setname("");
      seteditId(null);
      setisEditing(false);
      showAlert(true, "value changed", "success");
    } else {
      showAlert(true, "added a item to the list", "success");
      const newitem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newitem]);
      setname("");
    }
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const showAlert = (show = false, msg = "", type = "") => {
    setalert({ show, msg, type });
  };

  const clearList = () => {
    showAlert(true, "empty", "danger");
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, "rmove item", "danger");
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setisEditing(true);
    seteditId(id);
    setname(specificItem.title);
  };

  return (
    <section className="section-center">
      <form onSubmit={handleSubmit} className="grocery-form">
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e. g. grocery"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "Edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} editItem={editItem} removeItem={removeItem} />
          <button className="clear-btn" onClick={clearList}>
            clear item
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
