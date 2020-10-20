import React, { Component } from "react";
import "../../StyleSheet/NewProduct.css";
import axios from "axios";

class HomePoductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: "",
      ingredients: "",
      price: "",
      image: null,
    };
    this.handleForm = this.handleForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.cancelAction = this.cancelAction.bind(this);
  }

  handleForm(e) {
    this.setState({
      [e.target.id]: e.target.files ? e.target.files[0] : e.target.value,
    });
  }

  cancelAction(e) {
    e.preventDefault();
    const check = prompt(
      "Information will be lost, do you want to cancel? yes/no"
    );

    if (check !== null && check.toLocaleLowerCase() === "yes") {
      return window.location.reload(false);
    }
  }
  submitForm(e) {
    e.preventDefault();
    console.log(this.state);
    if (
      this.state.details === "" ||
      this.state.image === null ||
      this.state.ingredients === "" ||
      this.state.price === ""
    ) {
      return alert("All fields have to be filled in");
    }
    const id = window.location.href.split("/")[4];
    console.log(id);
    const url = `/api/update-home-products/${id}`;

    const data = new FormData();
    data.append("description", this.state.details);
    data.append("price", this.state.price);
    data.append("image", this.state.image);
    data.append("ingredients", this.state.ingredients);

    axios
      .post(url, data)
      .then((response) => {
        alert(response.data.msg);
        window.location.reload(false);
      })
      .catch((error) => {
        alert(error.response.data.msg);
      });
  }

  render() {
    return (
      <div className="NewProduct__form">
        <form className="AddProduct__form">
          <h3>ADD NEW PRODUCT</h3>

          <label>Product Details</label>
          <textarea
            id="details"
            cols="30"
            rows="10"
            placeholder="Product details"
            onChange={this.handleForm}
          ></textarea>
          <label>Product Ingredients</label>
          <input
            type="text"
            placeholder="Product ingredients"
            onChange={this.handleForm}
            id="ingredients"
          />
          <label>Product Image</label>
          <input type="file" onChange={this.handleForm} id="image" />
          <label>Product Price</label>
          <input
            type="number"
            placeholder="Product price"
            onChange={this.handleForm}
            id="price"
          />

          <button onClick={this.submitForm}>ADD PRODUCT</button>
          <button className="CancelButton" onClick={this.cancelAction}>
            CANCEL
          </button>
        </form>
      </div>
    );
  }
}

export default HomePoductForm;
