import React, { useEffect, useState } from "react";
import { UserListApi } from "../../app/api/UserApi";
import {User} from "../../app/model/User"
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {Container, Row, Col, Button } from "react-bootstrap";
import { Icon } from '@iconify/react';
import EditUser from "./edit_user";
import ActionTypes from "../../app/store/ActionTypes";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { RootState } from "../../app/store/store";
import DeleteUser from "./delete_user";
import ViewUser from "./view_user";
import AddUser from "./add_user";



export default function UsersPage() {

  //const [users, setUsers] = useState([]);
  const [userData, setUserdata] = useState({});
  const [addShow, setAddShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [viewShow, setViewShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const dispatch = useAppDispatch();
  const { userList } = useAppSelector((state: RootState) => state.UserList);
  const fetchUsers = async ()=>{
    const response: any =  await new UserListApi().getUsers()
    //setUsers(response.data)
    dispatch({
      type: ActionTypes.GET_ALL_USERS,
      userList: response.data,
    });

  }

  const onClickEdit = (data: any) => {
    setUserdata(data);
    setEditShow(true);
  }

  const onClickDelete = (data: any) => {
    setUserdata(data);
    setDeleteShow(true);
  }

  const onClickView = (data: any) => {
    setUserdata(data);
    setViewShow(true);
  }

  const onClickAdd = (data: any) => {
    setAddShow(true);
  }


  const columnDefs:any = [
    {field:'name'},
    { field: 'email' },
    { field: 'role' },
    { field: 'action',
    cellRenderer: (data: any)=> {
      return <>
      <Icon onClick={()=> onClickEdit(data.data) }  width="28" height="28" color="blue" icon="bxs:edit" />
      <Icon onClick={()=> onClickDelete(data.data) } width="28" height="28" color="maroon"  icon="ant-design:delete-filled" />
      <Icon onClick={()=> onClickView(data.data) } width="28" height="28" color="green"  icon="carbon:view-filled" />
      </>
    } }
    
  ]
 
  useEffect(() => {
       fetchUsers()
  }, []);

  return (
    <>
      {viewShow ?(<ViewUser show={viewShow} setViewShow={setViewShow} userData={userData}/>):
      (
        <>
      <Container>
        <Row>
          <div style={{ width: "150px", float: "left", margin : "5px"}}><h2> User List </h2></div>
          <div style={{ width: "30%", float: "left", margin : "5px"}}><Button onClick={onClickAdd}>Add User</Button></div>
        </Row>
        <Row>
        <Col md={{ span: 12 }} > 
        <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
        <AgGridReact
          defaultColDef={{
            sortable: true,
            filter: true,         
          }}
          rowData={userList}
          columnDefs={columnDefs}
        ></AgGridReact>
        </div>
        </Col>
          </Row>
        </Container>
        <EditUser show={editShow} setEditShow={setEditShow} userData={userData}/>
        <DeleteUser show={deleteShow} setDeleteShow={setDeleteShow} userData={userData}/>
        <AddUser show={addShow} setAddShow={setAddShow}/>
        </>
        )}
   </>
  )
}

