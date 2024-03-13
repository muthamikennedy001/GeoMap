import { useState } from "react";
import { signupFields } from "../constants/FormFields/Farmer";
import FormAction from "./FormAction";
import Input from "./Input";
import { useHistory } from "react-router-dom";

const fields = signupFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.id] = ""));

export default function FarmerSignup() {
  const navigate = useHistory();
  const [signupState, setSignupState] = useState(fieldsState);

  const handleChange = (e) =>
    setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(signupState);
    createAccount();
  };

  //handle Signup API Integration here
  const createAccount = async () => {
    try {
      // Make an API call to your backend with the user's credentials
      const response = await fetch(
        "http://127.0.0.1:2000/api/user/farmer/generateToken",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupState), // Assuming loginState contains user credentials
        }
      );

      // Assuming your backend returns JSON response
      const data = await response.json();

      // Check if the login was successful based on the response
      if (response.ok) {
        // Handle successful login, e.g., redirect to dashboard
        console.log("Login successful");
        sessionStorage.setItem("token", data.token);
        localStorage.setItem("username", data.data);
        window.location.href = data.red + "/" + data.type;
      } else {
        // Handle login failure, e.g., display error message
        console.error("Login failed:", data.msg);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      // console.error('Error during login:', error);
    }
  };
  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={signupState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
        <FormAction handleSubmit={handleSubmit} text="Signup" />
      </div>
    </form>
  );
}
