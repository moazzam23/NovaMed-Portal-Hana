import React from "react";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTriangleExclamation
} from "@fortawesome/free-solid-svg-icons";

function CustomModal({ show, onHide, onConfirm }) {
  return (
     <Modal   show={show} onHide={onHide}>
      <Modal.Body style={{fontSize:"0.8rem",textAlign:"center"}}>
       <FontAwesomeIcon icon={faTriangleExclamation} style={{color: "red",height:"4rem", width:"4rem",alignItems:"center"}} /> <br/>
      Are You Sure?
         </Modal.Body>
      <Modal.Footer >
         <Button style={{padding:"10px 20px", fontSize:"10px",border:"solid 1px silver",backgroundColor:"white",color:"black" }}  onClick={onHide}>
          No
        </Button>
        <Button variant="none" style={{backgroundColor:"#910109",border:"none", padding:"10px 20px", fontSize:"10px"}} onClick={onConfirm}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CustomModal;
