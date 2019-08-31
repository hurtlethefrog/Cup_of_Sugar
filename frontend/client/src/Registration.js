import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  function handleChange(e) {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  };
}

function Registration(props) {
  const firstName = useFormInput("");
  const lastName = useFormInput("");
  const email = useFormInput("");
  const password = useFormInput("");
  const passwordConfirmation = useFormInput("");
  const address = useFormInput("");
  const postalCode = useFormInput("");
  const city = useFormInput("");
  const province = useFormInput("");

  return (
    <main className="">
      <section className="">
        <form>
          <label>Name
            <input
              placeholder="First Name"
              {...firstName}
              required
            />
          </label>
          <input
            placeholder="Last Name"
            {...lastName}
            required
          />
          <input
            placeholder="Email"
            {...email}
            required
          />
          <input
            placeholder="Password"
            {...password}
            required
          />
          <input
            placeholder="Confirm Password"
            {...passwordConfirmation}
            required
          />
          <input
            placeholder="Address"
            {...address}
            required
          />
          <input
            placeholder="Postal Code"
            {...postalCode}
            required
          />
          <input
            placeholder="City"
            {...city}
            required />
          <input
            placeholder="Province"
            {...province}
            required
          />
        <input type="submit" value="Submit" />
        </form>
      </section>
    </main>
  );
}

// create_table :communities do |t|
// t.string :name
// t.string :postal_code

// t.references :communities, index: true, foreign_key: true, on_delete: :cascade
// t.string :address
// t.string :postal_code
// t.string :province
// t.string :city

// t.references :households, index: true, foreign_key: true
// t.string :first_name
// t.string :last_name
// t.string :email
// t.string :password
// t.string :password_confirmation
// t.string :profile_pic
// t.string :phone_number
// t.string :bio
// t.string :private
// t.boolean :is_admin