import { useEffect } from "react";
import { loginFields } from "../constants/FormFields";

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function LogOut() {
  useEffect(() => {
    async function fetchData() {
      try {
        // Make an API call to your backend with the user's credentials
        const response = await fetch("http://127.0.0.1:2000/api/user/logout", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // Assuming your backend returns JSON response
        const data = await response.json();
        console.log(data);
        localStorage.removeItem("token");
        window.location.href = "/";
      } catch (error) {
        // Handle network errors or other exceptions
        // console.error('Error during login:', error);
      }
    }
    fetchData();
  }, []);
  return <></>;
}
