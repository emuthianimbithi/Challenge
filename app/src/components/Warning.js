import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState} from "react"

function Warning({ state }) {
  const [show, setShow] = useState(null);
  setShow(state);

  const handleClose = () => setShow(false);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>Log In first</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Warning;
