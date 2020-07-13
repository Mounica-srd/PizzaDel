import React, { Component } from "react";
import axios from "axios";

/**
 * Example usage of {@link WorkList} component.
 * @extends React.Component
 * @constructor
 * @param {object} props - optional params
 */

export default class WorkList extends Component {
  constructor(props) {
    super(props);

    this.state = { worklist: [] };
  }

   /**
   * Make an API call to fetch Worklist data given by the customer.
   * We used Axios and Promise here for API calls
   * @return {object} fetch
   */

  componentDidMount() {
    axios
      .get("http://localhost:3001/worklist")
      .then((response) => {
        this.setState({ worklist: response.data }); 
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    const worklists = this.state.worklist;
    let items = [];
    for (const [key, value] of Object.entries(worklists)) {
      items.push(key + "  :  " + value);
    }
    return (
      <div>
        {items.map((item) => (
          <li>{item}</li>
        ))}
      </div>
    );
  }
}
