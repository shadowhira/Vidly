import Joi from "joi-browser";
import React from "react";
import Form from "./form";
import { register } from "../../services/userService";
import { toast } from "react-toastify";
import auth from "../../services/authService";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().email().required().label("Username (email)"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().required().label("Username"),
  };

  doSubmit = async () => {
    try {
      const reponse = await register(this.state.data);
      auth.loginWithJwt(reponse.headers["x-auth-token"]);
      toast.success("Registered successfully");
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
