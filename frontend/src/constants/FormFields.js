const loginFields = [
  {
    labelText: "ID Number",
    labelFor: "idno",
    id: "idno",
    name: "ID Number",
    type: "number",
    autoComplete: "number",
    isRequired: true,
    placeholder: "ID Number",
  },
  {
    labelText: "Password",
    labelFor: "password",
    id: "password",
    name: "password",
    type: "password",
    autoComplete: "current-password",
    isRequired: true,
    placeholder: "Password",
  },
];

const signupFields = [
  {
    labelText: "Username",
    labelFor: "username",
    id: "username",
    name: "username",
    type: "text",
    autoComplete: "username",
    isRequired: true,
    placeholder: "Username",
  },
  {
    labelText: "ID Number",
    labelFor: "idno",
    id: "idno",
    name: "ID Number",
    type: "number",
    autoComplete: "number",
    isRequired: true,
    placeholder: "ID Number",
  },
  {
    labelText: "Password",
    labelFor: "password",
    id: "password",
    name: "password",
    type: "password",
    autoComplete: "current-password",
    isRequired: true,
    placeholder: "Password",
  },
  {
    labelText: "Confirm Password",
    labelFor: "confirm-password",
    id: "confirm-password",
    name: "confirm-password",
    type: "password",
    autoComplete: "confirm-password",
    isRequired: true,
    placeholder: "Confirm Password",
  },
];

export { loginFields, signupFields };
