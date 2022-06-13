import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { DeleteUserAPI, UserListApi } from "../../app/api/UserApi";
import ActionTypes from "../../app/store/ActionTypes";
import { useAppDispatch } from "../../app/store/hooks";

function DeleteUser(props:any) {
  const [show, setShow] = useState(props.show);
  const [userData, setUserData] = useState(props.userData);
  const handleClose = () => {setShow(false); props.setDeleteShow(false)};
  const handleShow = () => {setShow(true); props.setDeleteShow(true)};
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  useEffect(()=> {
    props.show ? handleShow() : handleClose()
    setUserData(props.userData)
    setName(props.userData.name)
    setId(props.userData.id)
  }, [props.show, props.userData]);

  const fetchUsers = async ()=>{
    const response: any =  await new UserListApi().getUsers()
    //setUsers(response.data)
    dispatch({
      type: ActionTypes.GET_ALL_USERS,
      userList: response.data,
    });

  }

  const submit = async () => {
    // Can be refactored in better way
    const response: any = await new DeleteUserAPI().DeleteUser(id);
    console.log(response.data); // check the status etc, handle failing scenario
    fetchUsers()
    handleClose()
    // dispatch({
    //   type: ActionTypes.UPDATE_SUCCESS,
    //   token: response.data.token,
    // });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User ... !!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete user {name}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            cancel
          </Button>
          <Button variant="primary" onClick={submit}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteUser;