import { useContext } from "react";
import axios from "axios";
import { setAuthToken } from "../helpers/setAuthToken";
import "./styles.css";
import img from "../assets/todoLogo.svg";
import { AuthContext } from "./AuthContext";

function Login() {
  const { login } = useContext(AuthContext);

  const handleSubmit = (email: string, password: string) => {
    login(email);

    const loginPayload = {
      email: "eve.holt@reqres.in",
      password: "cityslicka",
    };

    axios
      .post("https://reqres.in/api/login", loginPayload)
      .then((response) => {
        const token = response.data.token;

        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        setAuthToken(token);

        window.location.href = "/dashboard";
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <form
        className="form-auth"
        onSubmit={(event) => {
          event.preventDefault();
          const emailInput = document.querySelector<HTMLInputElement>("#email");
          const passwordInput =
            document.querySelector<HTMLInputElement>("#password");
          const email = emailInput?.value ?? "";
          const password = passwordInput?.value ?? "";
          handleSubmit(email, password);
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
