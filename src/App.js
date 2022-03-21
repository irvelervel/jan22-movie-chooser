import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row } from "react-bootstrap";
import MovieDetails from "./components/MovieDetails";
import { Component } from "react";
import MovieDropdown from "./components/MovieDropdown";

class App extends Component {
  state = {
    movieTitle: "Iron Man",
  };

  changeMovie = (newMovieTitle) => {
    this.setState({
      movieTitle: newMovieTitle,
    });
  };

  render() {
    return (
      <div className="App">
        <Container>
          <Row className="justify-content-center my-3">
            <Col md={6} className="text-light">
              <MovieDropdown
                value={this.state.movieTitle}
                changeMovie={this.changeMovie}
                // this is passing down changeMovie as a REFERENCE
              />
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
