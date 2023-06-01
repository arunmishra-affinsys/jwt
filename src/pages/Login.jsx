import React, { useContext } from "react";
import axios from "axios";
import { setAuthToken } from "../helpers/setAuthToken";
import "./styles.css";
import img from "../assets/todoLogo.svg";
import { AuthContext } from "./AuthContext";
import { history } from "../helpers/history";

function Login() {
  const { login } = useContext(AuthContext);
  // console.log(isLoggedIn);
  const handleSubmit = (email, password) => {
    console.log(email);
    login(email);
    const loginPayload = {
      email: "eve.holt@reqres.in",
      password: "cityslicka",
    };

    axios
      .post("https://reqres.in/api/login", loginPayload)
      .then((response) => {
        //get token from response
        const token = response.data.token;

        //set JWT token to local
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        //set token to axios common header
        setAuthToken(token);
        //redirect user to home page
        window.location.href = "/dashboard";
        // history.push("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <form
        className="form-auth"
        onSubmit={(event) => {
          event.preventDefault();
          const [email, password] = event.target.elements;
          handleSubmit(email.value, password.value);
        }}
      >
        <img src={img} alt="" />
        <div className="inputContainer">
          <input
            type="email"
            id="email"
            name="email"
            className="fInput email"
            placeholder="Email"
          />
          <input
            type="password"
            id="password"
            name="password"
            className="fInput password"
            placeholder="Password"
          />
          <input type="submit" value="Submit" className="submit" />
        </div>
      </form>
    </div>
  );
}
export default Login;
