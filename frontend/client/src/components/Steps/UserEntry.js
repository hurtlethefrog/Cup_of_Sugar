import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../../store/app";

export default function UserEntry(props) {
  const user = useSelector(state => state.app.user);
  console.log("OBJECT###################:", user);

  let userEntry = {
    ...user,
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: ""
  };

  const dispatch = useDispatch();
  // console.log("DISPATCH:", dispatch)

  const [userForm, updateUserForm] = useState(userEntry);

  const handleSubmission = function(event) {
    event.preventDefault();
    // console.log(userForm);
    dispatch(setUser(userForm));
    console.log("Object:", userEntry);

    axios
      .post("/api/users", { userForm })
      .then(function(res) {
        // console.log("user creation : ", res);
        const user_auth = {
          auth: { email: userForm.email, password: userForm.password }
        };
        // props.setUser(user_auth);
        console.log("user_auth:", user_auth);
        return axios.post("/api/user_token", user_auth);
      })
      .then(function(res) {
        console.log("res2:", res);
        localStorage.setItem("jwt", res.data.jwt);
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  return (
    <main>
      <section className="">
        <h1>UserEntry</h1>

        <form className="registration_fields" onSubmit={handleSubmission}>
          <input
            placeholder="First Name"
            value={userForm.first_name}
            onChange={event =>
              updateUserForm({ ...userForm, first_name: event.target.value })
            }
            required
          />
          <input
            placeholder="Last Name"
            value={userForm.last_name}
            onChange={event =>
              updateUserForm({ ...userForm, last_name: event.target.value })
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
            value={userForm.password_confirmation}
            onChange={event =>
              updateUserForm({
                ...userForm,
                password_confirmation: event.target.value
              })
            }
            required
            type="password"
          />
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
