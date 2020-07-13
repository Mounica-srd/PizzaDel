import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";

/**
 * Example usage of {@link CreateWorkItem} component.
 * @extends React.Component
 * @constructor
 * @param {object} props - optional params
 */
export default class CreateWorkItem extends Component {
  constructor(props) {
    super(props);
    this.onChangeCrust = this.onChangeCrust.bind(this);
    this.onChangeSauce = this.onChangeSauce.bind(this);
    this.onChangeCheese = this.onChangeCheese.bind(this);
    this.onChangeProtein = this.onChangeProtein.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeService = this.onChangeService.bind(this);
    this.onChangeDairy = this.onChangeDairy.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      crust: "Original",
      sauce: "Red sauce",
      dairy: "dairy",
      cheese: "Mozzarella",
      protein: "Anchovies", 
      veggieList: [],
      addedProducts: [],
      selectedService: "Delivery",
      name: "",
    };
  }
  addVeggieState() {
    let data = [];
    let { veggies } = this.props.data;
    if (veggies !== undefined && veggies.length !== 0) {
      for (var i = 0; i < veggies.length; i++) {
    // data.push vs split operator  data.push({name: veggies[i], isAdded: false});
        data = [...data, { name: veggies[i], isAdded: false }]; 
      }
      this.setState({ veggieList: data }); 
    }
    return data;
  }

    componentDidMount() {
    this.addVeggieState();
  }
 /**
   * onAddingItem is for check box to identify the veggies that are selected
   * @return {object}  
   */
    onAddingItem = (item) => {
    const isChecked = item.target.checked;
    const value = item.target.value;

    this.setState((prevState) => ({
      veggieList: prevState.veggieList.map((product) =>
        product.name === value ? { ...product, isAdded: isChecked } : product
      ),
    }));

    if (isChecked)
      this.setState((prevState) => ({
        addedProducts: [...prevState.addedProducts, value],
      }));
    else {
      const newAddedProducts = this.state.addedProducts.filter(
        (product) => product !== value
      );
      this.setState({ addedProducts: newAddedProducts });
    }
  };

   /**
   * Make an API call to fetch Inventory data.
   *  We used Axios and Promises for POST CALL. It allows you to associate handlers
   *  with an asynchronous action's eventual success value 
   *  or failure reason.  It has .then() and catch() methods
   * @return {object}  
   */
  onSubmit(e) {
    e.preventDefault();

    const workList = {
      crust: this.state.crust,
      sauce: this.state.sauce,
      cheese: this.state.cheese,
      protein: this.state.protein,
      veggies: this.state.veggies,
      dairy: this.state.dairy,
      selectedService: this.state.selectedService,
      addedProducts: this.state.addedProducts,
      name: this.state.name,
    };
    console.log("workLists: ", workList);
    window.location = "/";
    axios
      .post("http://localhost:3001/worklist", workList)
      .then((res) => console.log(res.data));
  }

  onChangeService(e) {
    this.setState({
      selectedService: e.target.value,
    });
  }

  onChangeCrust(e) {
    this.setState({
      crust: e.target.value,
    });
  }

  onChangeSauce(e) {
    this.setState({
      sauce: e.target.value,
    });
  }
  onChangeCheese(e) {
    this.setState({
      cheese: e.target.value,
    });
  }
  onChangeProtein(e) {
    this.setState({
      protein: e.target.value,
    });
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }
  onChangeDairy(e) {
    this.setState({
      dairy: e.target.value,
    });
  }
 
  render() {
    const { crusts } = this.props.data;
    const { sauces } = this.props.data;
    const { cheeses } = this.props.data;
    const { proteins } = this.props.data;
    const { veggieList } = this.state;
    const Veggies_list = veggieList.map((index, i) => (
      <tr key={i + 1}>
        <td>{i + 1} - </td>
        <td>{index.name}</td>
        <td>
          <div class="checkbox checkbox-circle checkbox-color-scheme">
            <label class="checkbox-checked">
              <input
                type="checkbox"
                value={index.name}
                checked={this.state.veggieList[i].isAdded}
                onChange={this.onAddingItem}
              />{" "}
              <span class="label-text">Add ?</span>
            </label>
          </div>
        </td>
      </tr>
    ));
    let milk;
    if (this.state.sauce === "White sauce") {
      milk = (
        <div>
          <label> Milk: </label>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="Dairy"
                checked={this.state.dairy === "Dairy"}
                onChange={this.onChangeDairy}
              />
              Dairy
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="Non Dairy"
                checked={this.state.dairy === "Non Dairy"}
                onChange={this.onChangeDairy}
              />
              Non Dairy
            </label>
          </div>
        </div>
      );
    }
    return (
      <div>
        <p>You are on the CreateWorkItem component!</p>
        <h3>Create New Pizza</h3>
        <form onSubmit={this.onSubmit}>
          <label> Pick the Crust: </label>
          <select
            required
            className="form-control"
            value={this.state.crust}
            onChange={this.onChangeCrust}
          >
            {crusts &&
              crusts.map((crust) => (
                <option value={crust} key={crust}>
                  {crust}
                </option>
              ))}
          </select>
          <label> Pick an amazing Sauce: </label>
          <select
            required
            className="form-control"
            value={this.state.sauce}
            onChange={this.onChangeSauce}
          >
            {sauces &&
              sauces.map((sauce) => (
                <option value={sauce} key={sauce}>
                  {sauce}
                </option>
              ))}
          </select>
          {milk}
          <label> Pick the type of Cheese: </label>
          <select
            required
            className="form-control"
            value={this.state.cheese}
            onChange={this.onChangeCheese}
          >
            {cheeses &&
              cheeses.map((cheese) => (
                <option value={cheese} key={cheese}>
                  {cheese}
                </option>
              ))}
          </select>
          <label> Pick a Protein: </label>
          <select
            required
            className="form-control"
            value={this.state.protein}
            onChange={this.onChangeProtein}
          >
            {proteins &&
              proteins.map((protein) => (
                <option value={protein} key={protein}>
                  {protein}
                </option>
              ))}
          </select>
          <label> Pick your veggies: </label>
          <table>
            <tbody>{Veggies_list}</tbody>
          </table>
          <div style={{ marginTop: "20px" }}>
            Added Products: {this.state.addedProducts.join(", ")}
          </div>
          <label> Select a service: </label>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="Delivery"
                checked={this.state.selectedService === "Delivery"}
                onChange={this.onChangeService}
              />
              Delivery
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="Takeout"
                checked={this.state.selectedService === "Takeout"}
                onChange={this.onChangeService}
              />
              Takeout
            </label>
          </div>
          <div className="form-group">
            <label>Enter your Name: </label>
            <input
              type="text"
              required
              placeholder="Name please"
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create Pizza WorkList"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
