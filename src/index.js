import React from "react";
import { render } from "react-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { FirstDropDown } from "./components/FirstDropDown";
import { SecondDropDown } from "./components/SecondDropDown";
import { ThirdDropDown } from "./components/ThirdDropDown";
import { SearchButton } from "./components/SearchButton";
import { TableResult } from "./components/TableResult";
import { SpeakerProvider } from "./context/dropdownContext";

import "./App.css";

const App = () => {
  return (
    <SpeakerProvider>
      <Container>
        <br />
        <h1>Test Project</h1>
        <br />
        <Row>
          <Col>
            <FirstDropDown />
          </Col>
          <Col>
            <SecondDropDown />
          </Col>
          <Col>
            <ThirdDropDown />
          </Col>
          <Col>
            <SearchButton />
          </Col>
        </Row>
      </Container>
      <br /> <br /> <br />
      <Container>
        <br /> <br /> <br />
        <TableResult />
      </Container>
    </SpeakerProvider>
  );
};

//export default App;
render(<App />, document.getElementById("root"));
