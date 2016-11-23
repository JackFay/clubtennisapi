import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import Admin from "./pages/Admin";
import AdminEvents from "./pages/AdminEvents"
import AdminRoster from "./pages/AdminRoster"
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Roster from "./pages/Roster";
import Schedule from "./pages/Schedule";
import {initializeEventsStore} from "../actions/eventActions"
import {initializePlayersStore} from"../actions/playerActions"
import {initializeLoginStore} from"../actions/loginActions"

initializeEventsStore();
initializePlayersStore();
initializeLoginStore();

const app = document.getElementById('app');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>  
    <IndexRoute component={Home}/>
    <Route path="roster" name="roster" component={Roster}></Route>
    <Route path="schedule" name="schedule" component={Schedule}></Route>
    <Route path="login" name="login" component={Login}></Route>
    <Route path="admin" name="admin" component={Admin}></Route>
    <Route path="adminEvents" name="adminEvents" component={AdminEvents}></Route>
    <Route path="adminRoster" name="adminRoster" component={AdminRoster}></Route>
    </Route>
  </Router>,
app);


