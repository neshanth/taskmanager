import React, { Component } from "react";

export default class MainContent extends Component {
  render() {
    return (
      <div id="layoutSidenav_content">
        <main>
          <div className="container-fluid px-4 mt-5">{this.props.children}</div>
        </main>
      </div>
    );
  }
}
