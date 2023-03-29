import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import './NoMatch.css';

function NoMatch() {
  return (<div className="no-match">

          <Card style={{ backgroundColor: 'black',boxShadow: '1px 1px 1px 1px white',textAlign: 'center', margin: '10px' }}>
          <Card.Body>
  <Card.Title><h1>ERROR 404!</h1></Card.Title>
  <Card.Text>
  <Card.Text style={{color: 'red'}}><h2>Oops!</h2></Card.Text> The page you're looking for does not exist
    </Card.Text>
      <Link to="/"><Button style={{ margin: '0 auto' }} variant="primary">Home</Button></Link>
  </Card.Body>
  </Card>

</div>)
}
export default NoMatch;