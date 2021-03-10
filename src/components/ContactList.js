import React, { useState, useEffect } from "react";
import Contact from "./Contact";
const API_USER = "https://jsonplaceholder.typicode.com/users";

const randAge = () => {
  return 20 + Math.floor(Math.random() * 10);
};
const ContactList = () => {
  const [contactList, setContactList] = useState([]);

  // mount
  useEffect(() => {
    const fetchUsers = () => {
      fetch(API_USER)
        .then((response) => response.json())
        .then((data) => {
          const conData = data.map((item) => ({ ...item, age: randAge() }));
          setContactList(conData);
        })
        .catch((e) => {
          console.log(e.message);
          setContactList([]);
        });
    };
    fetchUsers();
  }, []);

  const handleChangeName = (id, newName) => {
    let data = [...contactList];
    const dataId = data.findIndex((item) => item.id === id);
    data[dataId].name = newName;
    setContactList(data);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: "50px",
      }}
    >
      <h1> ContactList </h1>
      <div>
        {contactList.map((contact) => {
          return (
            <Contact
              contact={contact}
              key={contact.id}
              onChangeName={handleChangeName}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ContactList;
