import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { render } from "react-dom";

function EditBook(props:any) {
    const [show, setShow] = useState(props.show);
    const [bookData, setBookData] = useState(props.bookData);
    const handleClose = () => {setShow(false); props.setEditShow(false)}
    const handleShow = () => {setShow(true); props.setEditShow(true)}

    useEffect(()=> {
      props.show ? handleShow() : handleClose()
      setBookData(bookData)
      console.log(bookData)
    }, [props.show, props.bookData]);
  
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder={bookData.email}
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder={bookData.name}
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                <Form.Label>Role</Form.Label>
                <Form.Control as="select" defaultValue={"member"}>
                    <option value={"admin"}>Admin</option>
                    <option value={"editor"}>Editor</option>
                    <option value={"member"}>Member</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
  export default EditBook;