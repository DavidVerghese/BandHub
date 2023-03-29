import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import './NoAuthorization.css';

function NoAuthorization({webpage}) {
  return (<div className="no-auth">
    <h2>{webpage}</h2>
          <Card style={{ backgroundColor: 'black',boxShadow: '1px 1px 1px 1px white',textAlign: 'center', margin: '10px' }}>
          <Card.Body>
  <Card.Title><h1>ERROR 401!</h1></Card.Title>
  <Card.Text>
  <Card.Text style={{color: 'red'}}><h2>Sorry!</h2></Card.Text>You need to be logged in to access this page
    </Card.Text>
      <Link to="/login"><Button style={{ margin: '0 auto' }} variant="primary">Login</Button></Link>
  </Card.Body>
  </Card>

</div>)
}
export default NoAuthorization;