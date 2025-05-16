import React from "react";
import { Route, Switch } from "react-router-dom";
import SettingsPage from "./SettingsPage";
import SessionsPage from "./SessionsPage";
import "../styles/ContentsArea.scss";


export default () => (
  <div className="contentsArea">
    <Switch>
      <Route path="/settings" component={SettingsPage} />
      <Route path="/sessions" component={SessionsPage} />
      <Route component={SettingsPage} />
    </Switch>
  </div>
);
