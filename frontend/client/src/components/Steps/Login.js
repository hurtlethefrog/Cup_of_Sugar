import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../../store/app";

export default function Login(props) {
  const user = useSelector(state => state.app.user);

  const dispatch = useDispatch();

  let userEntry = {
    email: "",
    password: ""
  };

  const [userForm, updateUserForm] = useState(userEntry);
  const [error, setError] = useState(false);

  const handleSubmission = function(event) {
    event.preventDefault();
    // dispatch(setUser(userForm));

    axios
      .post(`/api/user_token`, {
        auth: { email: userForm.email, password: userForm.password }
      })
      .then(function(res) {
        console.log("res1:: ", res.data);
        window.location = "/";
      })
      .catch(function(err) {
        console.log("ERRRORORRR!:", err);
        setError(true);
      });
  };

  return (
    <main>
      <section className="">
        <h1>UserEntry</h1>

        <form className="registration_fields" onSubmit={handleSubmission}>
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
          <button type="submit">Submit</button>
        </form>
        <p>
          {error && (
            <div style={{ color: `red` }}>
              Invalid email address or password.
            </div>
          )}
        </p>
      </section>
      <footer>
        <button onClick={props.onBack} className="back-btn">
          Back
        </button>
        <button onClick={props.onNext} className="next-btn">
          Next
        </button>
      </footer>
    </main>
  );
}
