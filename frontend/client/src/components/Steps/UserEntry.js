import React, { useState } from "react";
import Axios from "axios";

export default function UserEntry(props) {
  let userEntry = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: ""
  };

  const [userForm, updateUserForm] = useState(userEntry);

  const handleSubmission = function(event) {
    event.preventDefault();
    console.log(userForm);

    // axios
    //   .post("/api/users", { userForm })
    //   .then(function(res) {
    //     console.log(res);
    //   })
    //   .catch(function(err) {
    //     console.log(err);
    //   });
  };

  return (
    <section className="">
      <h1>UserEntry</h1>

      <form className="registration_fields" onSubmit={handleSubmission}>
        <input
          placeholder="First Name"
          value={userForm.firstName}
          onChange={event =>
            updateUserForm({ ...userForm, firstName: event.target.value })
          }
          required
        />
        <input
          placeholder="Last Name"
          value={userForm.lastName}
          onChange={event =>
            updateUserForm({ ...userForm, lastName: event.target.value })
          }
          required
        />
        <input
          placeholder="Email"
          value={userForm.email}
          onChange={event =>
            updateUserForm({ ...userForm, email: event.target.value })
          }
          required
        />
        <input
          placeholder="Password"
          value={userForm.password}
          onChange={event =>
            updateUserForm({ ...userForm, password: event.target.value })
          }
          required
          type="password"
        />
        <input
          placeholder="Confirm Password"
          value={userForm.passwordConfirmation}
          onChange={event =>
            updateUserForm({
              ...userForm,
              passwordConfirmation: event.target.value
            })
          }
          required
          type="password"
        />
        <button type="submit">Submit</button>
      </form>

      <button onClick={props.onBack}>Back</button>
      <button onClick={props.onNext}>Next</button>
    </section>
  );
}
