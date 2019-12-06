import React from "react";
import {
  useParams,
  useRouteMatch,
  Link,
  Route,
  Switch
} from "react-router-dom";
const Topic = () => {
  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
};

const Topics = () => {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>
      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
};
export default Topics;
