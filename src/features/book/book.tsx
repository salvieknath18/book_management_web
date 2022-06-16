import React, { useEffect, useRef, useState } from "react";
import { BookListApi } from "../../app/api/BookApi";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Icon } from "@iconify/react";
import EditBook from "./edit_book";
import ActionTypes from "../../app/store/ActionTypes";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { RootState } from "../../app/store/store";
import DeleteBook from "./delete_book";
import AddBook from "./add_book";
import ViewBook from "./view_book";

export default function BooksPage() {
  //const [books, setBooks] = useState([]);

  const gridRef: any = useRef();
  const [bookData, setBookdata] = useState({});
  const [addShow, setAddShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [viewShow, setViewShow] = useState(false);
  const dispatch = useAppDispatch();
  const { bookList } = useAppSelector((state: RootState) => state.BookList);
  const userData = useAppSelector((state: RootState) => state.userData);
  const fetchBooks = async () => {
    const response: any = await new BookListApi().getBooks();
    //setBooks(response.data)
    dispatch({
      type: ActionTypes.GET_ALL_BOOKS,
      bookList: response.data,
    });
  };

  const onClickEdit = (data: any) => {
    setBookdata(data);
    setEditShow(true);
  };

  const onClickDelete = (data: any) => {
    setBookdata(data);
    setDeleteShow(true);
  };

  const onClickView = (data: any) => {
    setBookdata(data);
    setViewShow(true);
  };

  const onClickAdd = (data: any) => {
    setAddShow(true);
  };

  const columnDefs: any = [
    //{field:'isbn'},
    { field: "title" },
    //{ field: 'description' },
    { field: "genre" },
    { field: "author" },
    //{ field: 'year_published' },
    //{ field: 'total_count' },
    { field: "available_count" },
    {
      field: "action",
      cellRenderer: (data: any) => {
        return (
          <>
            {" "}
            {(userData.role === "admin" || userData.role === "editor") && (
              <>
                <Icon
                  onClick={() => onClickEdit(data.data)}
                  width="28"
                  height="28"
                  color="blue"
                  icon="bxs:edit"
                />

                <Icon
                  onClick={() => onClickDelete(data.data)}
                  width="28"
                  height="28"
                  color="maroon"
                  icon="ant-design:delete-filled"
                />
              </>
            )}
            <Icon
              onClick={() => onClickView(data.data)}
              width="28"
              height="28"
              color="green"
              icon="carbon:view-filled"
            />
          </>
        );
      },
    },
  ];

  const onGridReady = () => {
    gridRef.current?.api?.sizeColumnsToFit();
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      {viewShow ? (
        <ViewBook
          show={viewShow}
          setViewShow={setViewShow}
          bookData={bookData}
        />
      ) : (
        <>
          <Container>
            <Row>
              <div style={{ width: "170px", float: "left", margin: "5px" }}>
                <h2> Book List </h2>
              </div>
              {(userData.role === "admin" || userData.role === "editor") && (
                <div style={{ width: "30%", float: "left", margin: "5px" }}>
                  <Button onClick={onClickAdd}>Add Book</Button>
                </div>
              )}
            </Row>
            <Row>
              <Col md={{ span: 12 }}>
                <div
                  className="ag-theme-alpine"
                  style={{ height: 500, width: "100%" }}
                >
                  <AgGridReact
                    ref={gridRef}
                    defaultColDef={{
                      sortable: true,
                      filter: true,
                      resizable: true,
                    }}
                    onGridReady={onGridReady}
                    rowData={bookList}
                    columnDefs={columnDefs}
                  ></AgGridReact>
                </div>
              </Col>
            </Row>
          </Container>
          {(userData.role === "admin" || userData.role === "editor") && (
            <>
              <EditBook
                show={editShow}
                setEditShow={setEditShow}
                bookData={bookData}
              />
              <DeleteBook
                show={deleteShow}
                setDeleteShow={setDeleteShow}
                bookData={bookData}
              />
              <AddBook show={addShow} setAddShow={setAddShow} />
            </>
          )}
        </>
      )}
    </>
  );
}
