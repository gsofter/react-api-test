import React, { useState } from "react";

const styleSheet = {
  paddingTop: "10px",
  textAlign: "left",
};

const Contact = ({ contact, onChangeName }) => {
  const [data, setData] = useState(contact);
  const [editingName, setEditingName] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState(null);
  const handleEditName = (e) => {
    e.preventDefault();
    setEditingName(true);
  };

  const handleFinishEditing = (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      onChangeName(contact.id, e.target.value);
      setEditingName(false);
    }
  };

  const handleChangeName = (e) => {
    setData({
      ...data,
      name: e.target.value,
    });
  };

  const handleBlur = () => {
    setEditingName(false);
  };

  const fetchDetails = () => {
    fetch(`https://jsonplaceholder.typicode.com/todos?userId=${contact.id}`)
      .then((response) => response.json())
      .then((data) => {
        setDetails(data);
      });
  };

  const handleClickPlus = () => {
    if (details === null) fetchDetails();
    setShowDetails(true);
  };

  const handleClickMinus = () => {
    setShowDetails(false);
  };

  return (
    <div style={styleSheet}>
      {showDetails ? (
        <button onClick={handleClickMinus}> - </button>
      ) : (
        <button onClick={handleClickPlus}> + </button>
      )}
      My name is &nbsp;
      {editingName ? (
        <input
          value={data.name}
          onKeyUp={handleFinishEditing}
          onChange={handleChangeName}
        />
      ) : (
        <b onDoubleClick={handleEditName} onBlur={handleBlur}>
          {contact.name}
        </b>
      )}
      . I am <b> {contact.age} </b> years old.
      {showDetails && details !== null ? (
        <div className="details" style={{ marginLeft: "10px" }}>
          {details.map((item) => {
            return (
              <div>
                <input type="checkbox" checked={item.completed} />
                <span
                  style={
                    item.completed
                      ? {
                          textDecoration: "line-through",
                          color: "rgba(0, 0, 0, .7)",
                        }
                      : { color: "rgba(0, 0, 0)" }
                  }
                >
                  {item.title}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <> </>
      )}
    </div>
  );
};

export default Contact;
