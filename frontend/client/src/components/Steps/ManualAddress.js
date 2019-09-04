import React, { useState } from "react";
import Axios from 'axios';

export default function ManualAddress(props) {

  let manualAddressEntry = {
    address: "",
    postalCode: "",
    city: "",
    province: ""
  };

  const [addressForm, updateAddressForm] = useState(manualAddressEntry);

  const handleSubmission = function(event) {
    event.preventDefault();
    console.log(addressForm);

    // axios
    //   .post("/api/households", { addressForm })
    //   .then(function(res) {
    //     console.log(res);
    //   })
    //   .catch(function(err) {
    //     console.log(err);
    //   });
  };

  return (
    <section className="">
      <h1>ManualAddress</h1>

      <form className="registration_fields" onSubmit={handleSubmission}>
        <input
          placeholder="Address"
          value={addressForm.address}
          onChange={event =>
            updateAddressForm({ ...addressForm, address: event.target.value })
          }
          required
        />
        <input
          placeholder="Postal Code"
          value={addressForm.postalCode}
          onChange={event =>
            updateAddressForm({ ...addressForm, postalCode: event.target.value })
          }
          required
        />
        <input
          placeholder="City"
          value={addressForm.city}
          onChange={event =>
            updateAddressForm({ ...addressForm, city: event.target.value })
          }
          required
        />
        <input
          placeholder="Province"
          value={addressForm.province}
          onChange={event =>
            updateAddressForm({ ...addressForm, province: event.target.value })
          }
          required
        />
        <button type="submit">Submit</button>
      </form>

      <button onClick={props.onBack}>Back</button>
      <button onClick={props.onNext}>Next</button>
    </section>
  );
}