import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IDataType, IRowDataType } from "../../assets/interfaces/intefaces";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import Contacts from "./contacts/contacts";
import "./contacts-page.scss";
import Button from "../button/button";
import Popup from "../popup/popup";
import { contactsPageVariables, loginVariables } from "../../assets/variables/variables";
import AddEditContact from "./add-edit-contact/add-edit-contact";
import SearchContact from "./search-contact/search-contact";
import { useContacts } from "../../hooks";
import { useHistory } from "react-router-dom";

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [text, setText] = useState("");
  const history = useHistory();
  const currentUser = useSelector(function (state: {
    currentUserData: { data: IDataType };
  }) {
    return state.currentUserData.data;
  });

  const currentContact = useSelector(function (state: {
    currentContact: { data: IRowDataType<string> };
  }) {
    return state.currentContact.data;
  });

  const searchedContacts = useContacts(contacts, text);

  useEffect(() => {
    fetch(`http://localhost:3000/userContacts?userId=${currentUser.id}`)
      .then((response) => response.json())
      .then((data) => {
        const sortedContacts = data.sort((a: IRowDataType<number>, b: IRowDataType<number>) =>
          a.name < b.name ? -1 : 1
        );
        setContacts(sortedContacts);
      });
  }, [currentUser.id]);

  return (
    <div className="contacts-page-container">
      <Button value = {loginVariables.logOut} className="log-out" onClick = {()=>history.push("/")}/>
      <ContactPhoneIcon className="contact-icon" />
      <h2>{currentUser.name}</h2>
      <SearchContact setText={setText} text={text} />
      <Contacts
        contacts={searchedContacts}
        setContacts={setContacts}
        setShowPopup={setShowPopup}
      />
      <Button
        value={contactsPageVariables.addContact}
        onClick={() => setShowPopup(true)}
        className="add-contact"
      />
      {showPopup && (
        <Popup
          show={showPopup}
          data={
            <AddEditContact
              setContacts={setContacts}
              contacts={contacts}
              onHide={(): void => setShowPopup(false)}
              contact={currentContact}
            />
          }
          onHide={(): void => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default ContactsPage;
