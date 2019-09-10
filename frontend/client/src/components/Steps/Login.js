import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Redirect} from "react-router-dom";
import axios from "axios";
import { setUser } from "../../store/app";

export default function Login(props) {
  const user = useSelector(state => state.app.user);

  const dispatch = useDispatch();

  let userEntry = {
    email: "",
    password: ""
  };

  const [redirect, setRedirect] = useState(false);
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
        localStorage.setItem("jwt", res.data.jwt);
        setRedirect(true);
      })
      .catch(function(err) {
        console.log("ERRRORORRR!:", err);
        setError(true);
      });
  };

  return (redirect? <Redirect to='/' /> :
    <main>
      <section className="">
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
          {error && (
            <div>
              Invalid email address or password.
            </div>
          )}
          <footer>
            <button type="submit" className="next-btn">
              Next
            </button>
            <button onClick={props.onBack} className="back-btn">
              Back
            </button>
          </footer>
        </form>
      </section>
    </main>
  );
}
