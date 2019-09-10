import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { setUser } from "../../store/app";

export default function UserEntry(props) {
  const user = useSelector(state => state.app.user);
  const userId = useSelector(state => state.app.user.user_id);
  const [redirect, setRedirect] = useState(false);
  const [imagebox, setImagebox] = useState(false);
  const [error, setError] = useState(false);

  let userEntry = {
    ...user,
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    image: ""
  };

  const dispatch = useDispatch();
  // console.log("DISPATCH:", dispatch)

  const [userForm, updateUserForm] = useState(userEntry);

  const handleSubmission = function(event) {
    event.preventDefault();
    // console.log(userForm);
    dispatch(setUser(userForm));

    axios
      .post("/api/users", { userForm })
      .then(function(res) {
        dispatch(setUser({...user, user_id: res.data.user_id}))
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
        setRedirect(true);
      })
      .catch(function(err) {
        console.log(err);
        setError(true);
      });
  };

  return redirect ? (
    <Redirect to="/" />
  ) : (
    <main>
      <section className="">
        <p>Please enter your credentials.</p>

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
                     <Dropzone
              onDrop={acceptedFiles =>
                updateUserForm({ ...userForm, image: acceptedFiles })
              }
              accept="image/png, image/jpeg"
            >
              {({
                getRootProps,
                getInputProps,
                isDragActive,
                isDragReject,
                acceptedFiles
              }) => (
                <section className="box">
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {!isDragActive &&
                      "Click here or drop a png/jpeg to upload!"}
                    {isDragActive && !isDragReject && "Right there!"}
                    {isDragReject &&
                      "File type not accepted, please choose a png or jpeg!"}
                    <ul className="list-group mt-2">
                      {acceptedFiles.length > 0 &&
                        acceptedFiles.map(acceptedFile => (
                          <li key={acceptedFile.name + "key"} className="box">
                            {acceptedFile.name}
                          </li>
                        ))}
                    </ul>
                  </div>
                </section>
              )}
            </Dropzone>
          {error && <sub>The email already exists. Please try again.</sub>}
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
