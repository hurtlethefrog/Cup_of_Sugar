import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUser } from "../../store/app";

export default function ManualAddress(props) {
  const dispatch = useDispatch();

  let manualAddressEntry = {
    address: "",
    postal_code: "",
    city: "",
    province: ""
  };

  const [addressForm, updateAddressForm] = useState(manualAddressEntry);
  const [error, setError] = useState(false);

  const validate = function() {
    if (addressForm.address === "" || addressForm.postal_code === "" || addressForm.city === "" || addressForm.province === "") {
      setError(true);
      return;
    }

    setError("");
    props.onNext();
  }

  return (
    <main>
      <section className="">
        <p>Please provide your address.</p>

        <form className="registration_fields">
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
            value={addressForm.postal_code}
            onChange={event =>
              updateAddressForm({
                ...addressForm,
                postal_code: event.target.value
              })
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
              updateAddressForm({
                ...addressForm,
                province: event.target.value
              })
            }
            required
          />
          <footer>
            <button type="submit" onClick={validate} value={dispatch(setUser(addressForm))} className="next-btn">
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
