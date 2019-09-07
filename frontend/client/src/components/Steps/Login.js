import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import axios from "axios";
import { setUser } from "../../store/app"

export default function Login(props) {

  const user = useSelector(state => state.app.user)

  const dispatch = useDispatch()

  let userEntry = {
    email: "",
    password: "",
  };

  const [userForm, updateUserForm] = useState(userEntry);

  const handleSubmission = function(event) {
    event.preventDefault();
    console.log(userForm);
    // dispatch(setUser(userForm));

    axios
      .get(`/api/users/`, { userForm })
      .then(function(res) {
        console.log("user creation : ", res);
      })      
      .then(function(res){
        console.log("res2:", res)
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
      </section>
      <footer>
        <button onClick={props.onBack} className="back-btn">Back</button>
        <button onClick={props.onNext} className="next-btn">Next</button>
      </footer>
    </main>
  );
}