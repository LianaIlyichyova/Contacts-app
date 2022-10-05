import React from "react";
import { Modal } from "react-bootstrap";
import { IDataModalType } from "../../assets/interfaces/intefaces";
import "bootstrap/dist/css/bootstrap.min.css";

const Popup = (props: IDataModalType) => {
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="modal-90w"
    >
      <Modal.Body id="popup">{props.data}</Modal.Body>
    </Modal>
  );
};

export default Popup;
