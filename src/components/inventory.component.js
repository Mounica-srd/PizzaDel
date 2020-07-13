import React, { Component } from "react";
import CreateWorkItem from "./createWorkItem.component";

/**
 * Example usage of {@link Inventory} component.
 * @extends React.Component
 * @constructor
 * @param {object} props - optional params
 */
class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      inventory: {},
    };
  }
  /**
   * Make an API call to fetch Inventory data.
   *  We used Fetch API and Promises. It allows you to associate handlers
   *  with an asynchronous action's eventual success value 
   *  or failure reason.  It has .then() and catch() methods
   * @return {object} fetch
   */ componentDidMount() {
    const apiUrl = "http://localhost:3001/Inventory";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ loading: true, inventory: { ...data } });
        console.log("This is your data", data);
      });
  }

  render() { 
    return (
      <React.Fragment>
        {this.state.loading && <CreateWorkItem data={this.state.inventory} />}
      </React.Fragment>
    );
  }
}
export default Inventory;
