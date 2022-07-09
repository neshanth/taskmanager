import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

export default class Sidebar extends Component {
  render() {
    return (
      <div id="layoutSidenav_nav">
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
          <div className="sb-sidenav-menu">
            <div className="nav mt-5">
              <Link className="nav-link" to="/dashboard/tasks">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-tachometer-alt"></i>
                </div>
                Tasks
              </Link>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
