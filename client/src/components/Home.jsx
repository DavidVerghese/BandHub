import vinyl from "./pictures/vinyl.png";
import turntable_arm from "./pictures/turntable_arm.png";
import turntable from "./pictures/turntable.png"
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function Home({user}) {
  
  
  return (
    <div className="home">
      
      <h2>Join The Band</h2>
      <em>find musicians in your area</em>

      <ButtonGroup style={{ display: 'block' }}>
        {/* condition used to be !user */}
        {false ? <>
          <Link to="/login"><Button style={{ margin: '10px'}}>Log in</Button></Link>
        <Link to="/signup"><Button style={{ margin: '10px'}}>Sign up</Button></Link>
        </> : <Link to="/profiles"><Button style={{ margin: '10px'}}>See profiles</Button></Link>}
        
        
      </ButtonGroup>
      <div id="turntable-container">
        <img id="turntable-arm" src={turntable_arm} />
        <img id="turntable" src={turntable} />
        <img id="spin" src={vinyl} />
      </div>
      
     
    </div>
  );
}

export default Home;
