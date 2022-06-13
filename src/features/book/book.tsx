import React, { useEffect, useState } from "react";
import { BookApi } from "../../app/api/BookApi";
import {Book} from "../../app/model/Book"
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {Container, Row, Col, Button } from "react-bootstrap";
import { Icon } from '@iconify/react';
import EditBook from "./edit_book";
import { AnyIfEmpty } from "react-redux";


export default function BooksPage() {

  interface book_data_type  {
    name: string, 
    email: string, 
    role: string
  }

  const [books, setBooks] = useState([]);
  const [bookData, setBookdata] = useState([]);
  const [editShow, setEditShow] = useState(false);
  const fetchBooks = async ()=>{
    const response: any =  await new BookApi().getBooks()
    response.data.forEach((elem:any)  => {elem.action = 'test'})
    setBooks(response.data)

  }

  const book_data_dummy: any = {
    name:"admin", 
    email: "admin@gmail.com", 
    role: "admin"
  }

  const onClickEdit = (data: any) => {
    setBookdata(data);
    setEditShow(true);
  }

  const columnDefs:any = [
    {field:'name'},
     { field: 'email' },
    { field: 'role' },
    { field: 'action',
    cellRenderer: (data: any)=> {
      return <>
      <Icon onClick={()=> onClickEdit(data.value) } icon="bxs:edit" />
      <Icon icon="ant-design:delete-filled" />
      </>
    } }
    
  ]
 
  useEffect(() => {
       fetchBooks()
  }, []);

  return (
    <>
      <Container>
        <Row>
        <Col md={{ span: 5 , offset: 3 }} > 
        <div className="ag-theme-alpine" style={{ height: 400, width: 800 }}>
        <AgGridReact
          defaultColDef={{
            sortable: true,
            filter: true,         
          }}
          rowData={books}
          columnDefs={columnDefs}
        ></AgGridReact>
        </div>
        </Col>
          </Row>
        </Container>
        <EditBook show={editShow} setEditShow={setEditShow} bookData={bookData}/>
   </>
  )
}

