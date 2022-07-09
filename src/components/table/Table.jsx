import React, { Component } from "react";
import "./table.css";

export default class Table extends Component {
  constructor() {
    super();
    this.state = { tableHeaders: ["#", "Collection", "Lists"] };
  }
  render() {
    return (
      <>
        <table className="table">
          <thead>
            <tr className="table-headers">
              {this.state.tableHeaders.map((th, index) => {
                return (
                  <th key={index} scope="col">
                    {th}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {this.props.tableData.map((data, index) => {
              const { id, collection_name, no_of_lists } = data;
              return (
                <tr key={id}>
                  <td>{index + 1}</td>
                  <td>{collection_name}</td>
                  <td>{no_of_lists}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}
