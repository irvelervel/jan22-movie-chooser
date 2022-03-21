import { Form } from "react-bootstrap";

const MovieDropdown = (props) => (
  <Form.Group>
    <Form.Label>Choose a movie!</Form.Label>
    <Form.Control
      as="select"
      value={props.value}
      onChange={(e) => props.changeMovie(e.target.value)}
    >
      <option>Iron Man</option>
      <option>Black Widow</option>
      <option>Captain America</option>
      <option>Ant Man</option>
      <option>Spider Man</option>
    </Form.Control>
  </Form.Group>
);

export default MovieDropdown;
