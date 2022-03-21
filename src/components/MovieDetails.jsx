import { Component } from "react";
import { Card } from "react-bootstrap";

class MovieDetails extends Component {
  // this component is receiving the selected movie in the dropdown
  // with a prop called "selectedMovie"

  componentDidMount = () => {
    // you always want to fetch dynamic data with componentDidMount
    // now I'm going to use selectedMovie and perform a fetch on it!
    this.fetchMovieDetails();
  };

  fetchMovieDetails = async () => {
    try {
      let response = await fetch(
        "http://www.omdbapi.com/?apikey=24ad60e9&s=" + this.props.selectedMovie
      ); // initially this.props.selectedMovie === 'Iron Man'
      if (response.ok) {
        let data = await response.json();
        console.log("MOVIE FETCH:", data);
      } else {
        console.log("we encountered an error :(");
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Card>
        <Card.Img variant="top" src="http://placekitten.com/300/200" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default MovieDetails;
