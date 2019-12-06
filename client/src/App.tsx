import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBCollapse,
  MDBContainer
} from "mdbreact";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
// import Topics from "./Components/Topics/Topics";
import { Users } from "./Components/Users/Users";

const SingleUserDisplay: React.FC = () => {
  let { id } = useParams();
  return <h3>Requested user ID: {id}</h3>;
};
const App: React.FC = () => {
  return (
    <Router>
      <MDBContainer>
        <MDBNavbar color="default-color" dark expand="md">
          <MDBCollapse id="navbarCollapse3" isOpen={true} navbar>
            <MDBNavbarNav left>
              <MDBNavItem>
                <MDBNavLink activeClassName="active" to="/">
                  Home
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink activeClassName="active" to="/about">
                  About
                </MDBNavLink>
              </MDBNavItem>
              {/* <MDBNavItem>
                <MDBNavLink to="/topics">Topics</MDBNavLink>
              </MDBNavItem> */}
              <MDBNavItem>
                <MDBNavLink activeClassName="active" to="/users">
                  Users
                </MDBNavLink>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          {/* <Route exact path="/topics">
            <Topics />
          </Route> */}
          <Route exact path="/users">
            <Users />
          </Route>
          <Route exact path="/users/:id">
            <SingleUserDisplay />
          </Route>
        </Switch>
      </MDBContainer>
    </Router>
  );
};
export default App;
