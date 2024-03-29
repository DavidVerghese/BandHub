import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logIn } from "../../actions";
function Login({ baseURL, user, setUser }) {
  let history = useHistory();

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();

  const [currentUser, setCurrentUser] = useState({ name: "no user" });
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    email_address: "",
    picture_url: "",
    genre: "",
    instrument: "",
    location: "",
    looking_for: "",
  });
  const [loginErrors, setLoginErrors] = useState([]);

  const [toggle, setToggle] = useState(false);

  const handleSubmitLogin = (e) => {
    e.preventDefault();

    fetch(`/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: newUser.username,
        password: newUser.password,
      }),
    }).then((resp) => {
      if (resp.ok) {
        resp.json().then((data) => {
          setLoginErrors([]);
          setCurrentUser(data);
          setToggle(!toggle);

          setUser(data);
          dispatch(logIn());
          history.push("/profiles");
          // setUser(data);
          // handleCurrentUser(data)
          // navigate('/')
        });
      } else {
        resp.json().then((json) => setLoginErrors(json.errors));
      }
    });
  };

  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="login-or-signup">
      <Form onSubmit={handleSubmitLogin}>
        <h2>Log in</h2>
        <Link to="/signup">Sign up if you do not have an account</Link>
        {loginErrors.map((loginError) => (
          <>
            <em>{loginError}</em>
            <br></br>
          </>
        ))}
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            name="username"
            value={newUser.username}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={newUser.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
export default Login;
