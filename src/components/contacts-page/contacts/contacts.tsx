import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ClearIcon from "@material-ui/icons/Clear";
import EditIcon from "@material-ui/icons/Edit";
import { v4 as uuidv4 } from "uuid";
import "./contacts.scss";
import { IRowDataType } from "../../../assets/interfaces/intefaces";
import { useFetchOptions } from "../../../hooks";
import { useDispatch } from "react-redux";

const Contacts = ({ contacts, setContacts, setShowPopup }: any) => {
  const options = useFetchOptions("DELETE", "application/json");
  const dispatch = useDispatch();

  const handleEdit = (row: IRowDataType) => {
    setShowPopup(true);
    dispatch({
      type: "CURRENT_CONTACT",
      payload: {
        data: row,
      },
    });
  };

  const hadleDelete = (e: React.SyntheticEvent): void => {
    e.stopPropagation();
    const id = (e.target as HTMLInputElement).id;
    const newFilteredArray = contacts.filter(
      (contact: IRowDataType) => String(contact.id) !== String(id)
    );
    setContacts(newFilteredArray);
    fetch(`http://localhost:3000/userContacts/${id}`, options);
  };

  const dataKeys =
    contacts.length &&
    Object.keys(contacts[0]).filter((key) => key !== "id" && key !== "userId");

  const onLinkClick = (element: string, row: IRowDataType): void => {
    if (element === "email") {
      window.location.href = `mailto:${row[element]}`;
    } else if (element === "phone") {
      window.location.href = `tel:${row[element]}`;
    }
  };

  return (
    <div className="contacts-page-container">
      {contacts.length && (
        <TableContainer component={Paper} style={{ maxHeight: 350 }}>
          <Table aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                {dataKeys.map((title: string) => (
                  <TableCell key={uuidv4()}>{title.toUpperCase()}</TableCell>
                ))}
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map((row: IRowDataType) => (
                <TableRow className="table-row" key={uuidv4()}>
                  {dataKeys.map((element: string) => (
                    <>
                      <TableCell
                        align="left"
                        key={uuidv4()}
                        id={element}
                        onClick={() =>
                          element !== "name" && onLinkClick(element, row)
                        }
                      >
                        {row[element as keyof IRowDataType]}
                      </TableCell>
                    </>
                  ))}
                  <TableCell key={uuidv4()}>
                    <EditIcon
                      onClick={(e) => {
                        e.preventDefault();
                        handleEdit(row);
                      }}
                      className="edit-icon"
                    />
                    <ClearIcon
                      className="clear-icon"
                      onClick={hadleDelete}
                      id={row.id}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default Contacts;
