import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { render } from "react-dom";
import { UpdateBookAPI, BookListApi } from "../../app/api/BookApi";
import ActionTypes from "../../app/store/ActionTypes";
import { useAppDispatch } from "../../app/store/hooks";
import { Icon } from "@iconify/react";
import Image from "react-bootstrap/Image";
import { BorrowBook } from "../../app/api/BorrowApi";
import { useNavigate } from "react-router-dom";

function ViewBook(props: any) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [isbn, setIsbn] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [author, setAuthor] = useState("");
  const [yearPublished, setYearPublished] = useState("");
  const [totalCount, setTotalCount] = useState("");
  const [availableCount, setAvailableCount] = useState("");

  useEffect(() => {
    setId(props.bookData.id);
    setIsbn(props.bookData.isbn);
    setTitle(props.bookData.title);
    setDescription(props.bookData.description);
    setGenre(props.bookData.genre);
    setAuthor(props.bookData.author);
    setYearPublished(props.bookData.year_published);
    setTotalCount(props.bookData.total_count);
    console.log(props.bookData);
    setAvailableCount(props.bookData.available_count);
  }, [props.bookData]);

  const borroweRequest = async () => {
    const response: any = await new BorrowBook().borrowBook(props.bookData.id);
    console.log(response.data); // check the status etc, handle failing scenario
    navigate("/home ");
  };

  const bookListPage = () => {
    props.setViewShow(false);
  };
  return (
    <>
      <div className="container mt-5 mb-5">
        <Icon
          onClick={bookListPage}
          align="right"
          width="32"
          height="32"
          icon="bi:skip-backward-circle"
        />{" "}
        Back to Book list
        <div className="row no-gutters">
          <Image
            thumbnail={true}
            className="col-md-2 col-lg-4 square border border-dark"
            src="src/static/book.jpg"
            alt="Dispaly Book Image (Future Enhancement)"
          ></Image>
          <div className="col-md-10 col-lg-8">
            <div className="d-flex flex-column">
              <div className="d-flex flex-row justify-content-between align-items-center p-5 bg-dark text-white">
                <h3 className="display-5">{title}</h3>
                <i className="fa fa-facebook"></i>
                <i className="fa fa-google"></i>
                <i className="fa fa-youtube-play"></i>
                <i className="fa fa-dribbble"></i>
                <i className="fa fa-linkedin"></i>
              </div>
              <div className="p-3 bg-black text-white">
                <h6>ISBN &nbsp;&nbsp; : &nbsp;&nbsp; {isbn}</h6>
              </div>
              <div className="p-3 bg-black text-white">
                Description &nbsp;&nbsp; : &nbsp;&nbsp; {description}
              </div>
              <div className="p-3 bg-black text-white">
                Genere &nbsp;&nbsp; : &nbsp;&nbsp; {genre}
              </div>
              <div className="p-3 bg-black text-white">
                Author &nbsp;&nbsp; : &nbsp;&nbsp; {author}
              </div>
              <div className="p-3 bg-black text-white">
                Published on &nbsp;&nbsp; : &nbsp;&nbsp; {yearPublished}
              </div>
              <div className="p-3 bg-black text-white">
                Total Copies &nbsp;&nbsp; : &nbsp;&nbsp; {totalCount}
              </div>
              <div className="p-3 bg-black text-white">
                Avaiable Copies &nbsp;&nbsp; : &nbsp;&nbsp; {availableCount}
              </div>
              {/* {if props.bookData.availableCount >= 0 ()}<Button onClick={borroweRequest}></Button> */}
              {/* {console.log(`availableCount${availableCount}`)}
              {console.log(availableCount === "0")}
              {availableCount === "0" && ( */}
              {availableCount.toString() !== "0" && (
                <div className="p-3 bg-black text-white">
                  <Button onClick={borroweRequest}>Borrow book</Button>
                </div>
              )}
              {/* )} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewBook;
