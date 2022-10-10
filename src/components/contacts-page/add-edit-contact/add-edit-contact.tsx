import React, { useState } from "react";
import { useSelector } from "react-redux";
import { contactsPageVariables } from "../../../assets/variables/variables";
import Button from "../../button/button";
import { v4 as uuidv4 } from "uuid";
import { useFetchOptions } from "../../../hooks";
import { IDataType, IRowDataType } from "../../../assets/interfaces/intefaces";
import "./add-edit-contact.scss";
import { useDispatch } from "react-redux";

const AddEditContact = ({ setContacts, contacts, contact, onHide }: any) => {
  const [name, setName] = useState(contact.name);
  const [phone, setPhone] = useState(contact.phone);
  const [email, setEmail] = useState(contact.email);

  const currentUser = useSelector(function (state: {
    currentUserData: { data: IDataType };
  }) {
    return state.currentUserData.data;
  });

  const dispatch = useDispatch();
  const newContact = {
    name: name,
    email: email,
    phone: phone,
    id: contact.id ? contact.id : uuidv4(),
    userId: currentUser.id,
  };
  const addContactOptions = useFetchOptions(
    "POST",
    "application/json;charset=utf-8",
    JSON.stringify(newContact)
  );

  const editContactOptions = useFetchOptions(
    "PUT",
    "application/json",
    JSON.stringify(newContact)
  );

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    if (contact.id) {
      fetch(
        `http://localhost:3000/userContacts/${contact.id}`,
        editContactOptions
      ).catch((error) => console.log(error));
      const newContacts = contacts.map((element: IRowDataType<string>) => {
        if (element.id === contact.id) {
          return newContact;
        } else {
          return element;
        }
      });
      setContacts(newContacts);
    } else {
      setContacts([...contacts, newContact]);
      fetch(
        `http://localhost:3000/userContacts?userId=${currentUser.id}`,
        addContactOptions
      ).catch((error) => console.log(error));
    }
    dispatch({
      type: "CURRENT_CONTACT",
      payload: {
        data: {},
      },
    });
    onHide();
  };

  return (
    <form onSubmit={handleSubmit} className="add-contact-form">
      <div>
        <input
          type="text"
          name="name"
          placeholder={contactsPageVariables.addName}
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>
      <div>
        <input
          type="text"
          name="text"
          placeholder={contactsPageVariables.addPhone}
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
        />
      </div>
      <div>
        <label></label>
        <input
          type="text"
          name="email"
          placeholder={contactsPageVariables.addEmail}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
      <Button value={contactsPageVariables.save} />
    </form>
  );
};

export default AddEditContact;
