import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { render } from "react-dom";
import { UpdateUserAPI, UserListApi } from "../../app/api/UserApi";
import ActionTypes from "../../app/store/ActionTypes";
import { useAppDispatch } from "../../app/store/hooks";

function EditUser(props: any) {
  const [show, setShow] = useState(props.show);
  const [userData, setUserData] = useState(props.userData);
  const handleClose = () => {
    setShow(false);
    props.setEditShow(false);
  };
  const handleShow = () => {
    setShow(true);
    props.setEditShow(true);
  };
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    props.show ? handleShow() : handleClose();
    setUserData(props.userData);
    setName(props.userData.name);
    setEmail(props.userData.email);
    setRole(props.userData.role);
    setId(props.userData.id);
  }, [props.show, props.userData]);

  const fetchUsers = async () => {
    const response: any = await new UserListApi().getUsers();
    //setUsers(response.data)
    dispatch({
      type: ActionTypes.GET_ALL_USERS,
      userList: response.data,
    });
  };

  const submit = async () => {
    // Can be refactored in better way
    const response: any = await new UpdateUserAPI().updateUsers(
      id,
      name,
      email,
      role
    );
    console.log(response.data); // check the status etc, handle failing scenario
    fetchUsers();
    handleClose();
  };

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
                defaultValue={userData.email}
                autoFocus
                onChange={(event: any) => {
                  setEmail(event.target.value);
                }}
                value={email}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                defaultValue={userData.name}
                autoFocus
                onChange={(event: any) => {
                  setName(event.target.value);
                }}
                value={name}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                value={role}
                defaultValue={userData.role}
                onChange={(event: any) => {
                  setRole(event.target.value);
                }}
              >
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
          <Button variant="primary" type="submit" onClick={submit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditUser;
