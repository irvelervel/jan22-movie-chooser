import { Component } from "react";
import { Card } from "react-bootstrap";

// 1) component initially fires the render() method
// 2) isLoading is true, so render() will output the loading div and that's it
// 3) after the initial render(), componentDidMount() fires!
// 4) it will grab the movie data, and set the state
// 5) every time you set the state, render() fires again!
// 6) every time the movie dropdown selection changes, componentDidUpdate() fires
// 7) so we can call fetchMovieDetails() once again for fetching the new details
// 8) we just have to make sure that the state setting from fetchMovieDetails() doesn't fire the function again
// 9) for achieving this, we create an if statement in componentDidUpdate() and execute
// fetchMovieDetails() just when a new this.props.selectedMovie arrives, not every time
// we change the state <-- infinite loop risk

class MovieDetails extends Component {
  // this component is receiving the selected movie in the dropdown
  // with a prop called "selectedMovie"

  state = {
    movieObject: null,
    isLoading: true,
  };

  componentDidMount = () => {
    // you always want to fetch dynamic data with componentDidMount
    // now I'm going to use selectedMovie and perform a fetch on it!
    this.fetchMovieDetails();
  };

  // the problem is: our component is getting the new prop! but because our
  // data fetching process is executed JUST in componentDidMount(), we never
  // perform the new fetch()
  // but the props are getting received correctly...
  // we should find e method that listens for this new prop, and performs the
  // data fetching again!

  componentDidUpdate = (prevProps, prevState) => {
    console.log("entering componentDidUpdate");
    // componentDidUpdate is another reserved class method
    // this will be automatically called by React when.....
    // ...when a new prop is received, or a new state is set!
    // this.fetchMovieDetails();
    // this is kinda working... but setting the state into fetchMovieDetails()
    // enters componentDidUpdate again :(
    // --> infinite loop :(
    // I'm ok with calling fetchMovieDetails() when a prop changes!
    // ...but I'm not ok on invoking fetchMovieDetails() when the STATE changes
    // we're going to use prevProps, the first argument, to write this condition:
    if (prevProps.selectedMovie !== this.props.selectedMovie) {
      console.log("new movie in the dropdown! executing the fetch...");
      this.fetchMovieDetails();
    }
    // I'm entering componentDidUpdate twice, every time I select a new movie in the dropdown
    // the important thing is to NOT re-invoke fetchMovieDetails() when I set the state
  };

  fetchMovieDetails = async () => {
    this.setState({
      isLoading: true,
    });
    try {
      let response = await fetch(
        "http://www.omdbapi.com/?apikey=24ad60e9&s=" + this.props.selectedMovie
      ); // initially this.props.selectedMovie === 'Iron Man'
      if (response.ok) {
        let data = await response.json();
        console.log("MOVIE SEARCH RESULTS:", data);
        console.log("MOVIE DETAILS:", data.Search[0]);
        this.setState({
          movieObject: data.Search[0],
          isLoading: false,
        });
      } else {
        console.log("we encountered an error :(");
        this.setState({
          isLoading: false,
        });
      }
    } catch (error) {
      console.log(error);
      this.setState({
        isLoading: false,
      });
    }
  };

  render() {
    return this.state.isLoading ? (
      <div className="text-light">LOADING...</div>
    ) : (
      <Card>
        <Card.Img variant="top" src={this.state.movieObject.Poster} />
        <Card.Body>
          <Card.Title>{this.state.movieObject.Title}</Card.Title>
          <Card.Text>
            {this.state.movieObject.Year} - {this.state.movieObject.imdbID}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default MovieDetails;
