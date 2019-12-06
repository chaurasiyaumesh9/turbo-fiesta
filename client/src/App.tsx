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
import Topics from "./Components/Topics/Topics";
import { Users } from "./Components/Users/Users";

const SingleUserDisplay = () => {
  let { id } = useParams();
  return <h3>Requested user ID: {id}</h3>;
};
const App: React.FC = () => {
  return (
    <Router>
      <div className="container">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          {/* <li>
            <Link to="/users/1">User#1</Link>
          </li> */}
        </ul>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/topics">
            <Topics />
          </Route>
          <Route exact path="/users">
            <Users />
          </Route>
          <Route exact path="/users/:id">
            <SingleUserDisplay />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
export default App;
