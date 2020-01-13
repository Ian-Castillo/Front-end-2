import React, { Component } from "react";
import "./bootstrap.css";
import "./App.css";
import { axiosWithAuth } from "./axioswithauth";


const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
}; 

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // firstName: null,
      // lastName: null,
      username: null,
      password: null,
      formErrors: {
        // firstName: "",
        // lastName: "",
        username: "",
        password: ""
      }
    };
  }



  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {

      axiosWithAuth()
      .post("https://african-marketplace-backend.herokuapp.com/api/login", {
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        localStorage.setItem("token", res.data.token);
        // props.history.push("/YOUR-ROUTE");
      })
      .catch(err => {
        console.log({ err: "There was an error. Try again." });
      });
      console.log(`
        --SUBMITTING--
        First Name: ${this.state.firstName}
        Last Name: ${this.state.lastName}
        Email: ${this.state.email}
        Password: ${this.state.password}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Login</h1>
          <form onSubmit={this.handleSubmit} noValidate>
          {/* <div className="form-row">
                  <div className="col">
                    <input type="text" className={formErrors.firstName.length > 0 ? "form-control error" : "form-control"} placeholder="First name" type="text"
                name="firstName"
                noValidate
                onChange={this.handleChange}/>
                  </div>
                </div> */}
           
                {/* <div className="form-row">
                  <div className="col">
                    <input type="text" className={formErrors.lastName.length > 0 ? "form-control error" : "form-control"} placeholder="Last name" type="text"
                name="lastName"
                noValidate
                onChange={this.handleChange}/>
                  </div>
                </div> */}

                {/* <div className="form-row">
                  <div className="col">
                    <input type="text" className={formErrors.email.length > 0 ? "form-control error" : "form-control"} placeholder="last name" type="text"
                name="lastName"
                noValidate
                onChange={this.handleChange}/>
                  </div>
                </div> */}
      
            <div className="username">
              <label htmlFor="username">Username</label>
              <input
                className={formErrors.username.length > 0 ? "error" : null}
                placeholder="User Name"
                type="username"
                name="username"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.username.length > 0 && (
                <span className="errorMessage">{formErrors.username}</span>
              )}
            </div>

      
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Password"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>

           

            <div className="login">
              <button type="submit" onClick={this.handleSubmit}>login</button>
              {/* <small>login </small> */}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;