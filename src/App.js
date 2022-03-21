import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Form, Row } from "react-bootstrap";
import MovieDetails from "./components/MovieDetails";
import { Component } from "react";

class App extends Component {
  state = {
    movieTitle: "Iron Man",
  };

  render() {
    return (
      <div className="App">
        <Container>
          <Row className="justify-content-center my-3">
            <Col md={6} className="text-light">
              <Form.Group>
                <Form.Label>Choose a movie!</Form.Label>
                <Form.Control
                  as="select"
                  value={this.state.movieTitle}
                  onChange={(e) =>
                    this.setState({ movieTitle: e.target.value })
                  }
                >
                  <option>Iron Man</option>
                  <option>Black Widow</option>
                  <option>Captain America</option>
                  <option>Ant Man</option>
                  <option>Spider Man</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center my-3">
            <Col md={6}>
              <MovieDetails selectedMovie={this.state.movieTitle} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
