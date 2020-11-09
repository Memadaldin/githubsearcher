import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import styles from "./App.module.scss";

import GitHubSearcher from "./Containers/GitHubSearcher/GitHubSearcher";

const App = (): React.ReactElement => {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact render={() => <GitHubSearcher />} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
