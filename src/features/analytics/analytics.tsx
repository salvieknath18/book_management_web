import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { VictoryBar, VictoryPie, VictoryChart, VictoryTheme } from "victory";
import { BooksByGenre } from "../../app/api/BookApi";
import ActionTypes from "../../app/store/ActionTypes";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { RootState } from "../../app/store/store";

export default function Analytics() {
  const data = useAppSelector((state: RootState) => state.booksByGenre);
  const dispatch = useAppDispatch();
  const fetchBooksByGenre = async () => {
    const response: any = await new BooksByGenre().getBooks();
    console.log(`response: ${response.data}`);
    dispatch({
      type: ActionTypes.GET_BOOKS_BY_GENRE,
      bookList: response.data,
    });
  };

  useEffect(() => {
    fetchBooksByGenre();
  }, []);

  return (
    <Container>
      <h4>Analytics Page</h4>
      <Row>
        <Col lg={5}>
          {" "}
          <VictoryPie padding={80} data={data.gnreDatalist} />{" "}
        </Col>
        <Col lg={2}></Col>
        <Col lg={5}>
          <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
            <VictoryBar
              style={{ data: { fill: "#c43a31" } }}
              data={[
                { x: 1, y: 0.1 },
                { x: 2, y: 1 },
                { x: 3, y: 10 },
                { x: 4, y: 0 },
                { x: 5, y: 0.1 },
                { x: 6, y: 1 },
                { x: 7, y: 10 },
                { x: 8, y: 100 },
              ]}
            />
          </VictoryChart>
        </Col>
      </Row>
      <Row>
        <Col lg={5} align="middle">
          Book By Genre
        </Col>
        <Col lg={2}></Col>
        <Col lg={5} align="middle">
          Book Statistics(values are static for this chart)
        </Col>
      </Row>
    </Container>
  );
}
