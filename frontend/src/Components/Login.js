import { useState } from "react";
import { loginFields } from "../constants/FormFields";
import FormAction from "./FormAction";
import Input from "./Input";
import FormExtra from "./FormExtra";
import { useHistory } from "react-router-dom";

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Login() {
  const navigate = useHistory();
  const [loginState, setLoginState] = useState(fieldsState);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(loginState);
    authenticateUser();
  };

  //Handle Login API Integration here
  const authenticateUser = async () => {
    try {
      // Make an API call to your backend with the user's credentials
      const response = await fetch("http://127.0.0.1:2000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginState), // Assuming loginState contains user credentials
      });

      // Assuming your backend returns JSON response
      const data = await response.json();

      // Check if the login was successful based on the response
      if (response.ok) {
        // Handle successful login, e.g., redirect to dashboard
        console.log("Login successful");
        localStorage.setItem("token", data.token);
        console.log(data.data);
        localStorage.setItem("username", data.data);
        localStorage.setItem("idno", data.idno);

        window.location.href = data.red + "/" + data.type;
      } else {
        // Handle login failure, e.g., display error message
        console.error("Login failed:", data.msg);
        setError(data.msg);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      // console.error('Error during login:', error);
    }
  };
  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>
      <FormExtra message={error} />
      <FormAction handleSubmit={handleSubmit} text="Login" />
    </form>
  );
}
