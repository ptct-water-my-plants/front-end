import React, { useState } from "react";

const initialFormValues = {
  username: "",
  password: "",
};

const initialFormErrors = {
  username: "",
  password: "",
};

const Signin = () => {
  const [users, setUsers] = useState([]);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(true);

  return (
    <div>
      <h3>Sign In</h3>
      <p>New to Water My Plants? Sign up to get started here!</p>
      {/* Link to sign up page here */}
      <form>
        <label>
          Username
          <input type="text" value={formValues.username} />
        </label>
        <label>
          Password
          <input type="password" value={formValues.password} />
        </label>
        <button disabled={disabled}>Sign In</button>
      </form>
    </div>
  );
};

export default Signin;
