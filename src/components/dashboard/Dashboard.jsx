import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Tasks from "../task/Tasks";
import Header from "../header/Header";
import MainContent from "../maincontent/MainContent";
import Sidebar from "../sidebar/Sidebar";
import "./dashboard.css";
import EditTaskForm from "../task/EditTaskForm";

export default class Dashboard extends Component {
  render() {
    return (
      <>
        <Header />
        <div id="layoutSidenav">
          <Sidebar />
          <Switch>
            <Route exact path="/dashboard/tasks">
              <MainContent>
                <Tasks />
              </MainContent>
            </Route>
            <Route exact path="/dashboard/tasks/edit/:id">
              <MainContent>
                <EditTaskForm />
              </MainContent>
            </Route>
          </Switch>
        </div>
      </>
    );
  }
}
