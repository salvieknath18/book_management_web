import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { VictoryBar, VictoryPie, VictoryChart, VictoryTheme } from 'victory';


export default function Analytics() {
  return (
    <Container>

      <Row>
        <Col lg={6}>
<VictoryPie
  data={[
    { x: "Cats", y: 35 },
    { x: "Dogs", y: 40 },
    { x: "Birds", y: 55 }
  ]}
/>
</Col>
<Col lg={6}>
<VictoryChart
  theme={VictoryTheme.material}
  domainPadding={10}
><VictoryBar
    style={{ data: { fill: "#c43a31" } }}
    data={[
              { x: 1, y: 0.1 },
              { x: 2, y: 1 },
              { x: 3, y: 10 },
              { x: 4, y: 0 },
              { x: 5, y: 0.1 },
              { x: 6, y: 1 },
              { x: 7, y: 10 },
              { x: 8, y: 100 }
            ]}
  />
</VictoryChart>
</Col>
</Row></Container>
  )
}
