import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import { Users } from "./Components/Users/Users";

const SingleUserDisplay: React.FC = () => {
  let { id } = useParams();
  return <h3>Requested user ID: {id}</h3>;
};
const App: React.FC = () => {
  return (
    <Router>
      <ul>
        <li>
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="/about">ABOUT</Link>
        </li>
        <li>
          <Link to="/users">USERS</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/users">
          <Users />
        </Route>
        <Route exact path="/users/:id">
          <SingleUserDisplay />
        </Route>
      </Switch>
    </Router>
  );
};
export default App;
