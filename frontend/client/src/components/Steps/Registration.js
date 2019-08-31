import React, { useState, useEffect } from 'react';
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

export default function Registration(props) {
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
        <form className="registration_fields">
          <input
            placeholder="First Name"
            {...firstName}
            required
          />
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
            type="password"
          />
          <input
            placeholder="Confirm Password"
            {...passwordConfirmation}
            required
            type="password"
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

// communities=
// :name
// :postal_code

// households=
// :address
// :postal_code
// :province
// :city

// users=
// :households
// :first_name
// :last_name
// :email
// :password
// :password_confirmation
// :profile_pic
// :phone_number
// :bio
// :private
// :is_admin