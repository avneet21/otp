import { useEffect, useRef, useState } from "react";

const Otp = ({ length = 4 }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus;
    }
  }, []);

  const onHanldeChange = (idx, e) => {
    const value = e.target.value;

    if (isNaN(value)) return;

    const newOtp = [...otp];

    newOtp[idx] = value.substring(value.length - 1);
    setOtp(newOtp);

    // move focus to next field if current field is filled

    if (value && idx < length - 1 && inputRefs.current[idx + 1]) {
      inputRefs.current[idx + 1].focus();
    }
  };

  const onHanldeClick = (idx, e) => {
    inputRefs.current[idx].setSelectionRange(1, 1);

    // move the focus to back empty field if it finds any field empty
    if (idx > 1 && !otp[idx - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const onHanldeKeyDown = (idx, e) => {
    // move focus to back field if backspace is pressed
    if (
      e.key === "Backspace" &&
      !otp[idx] &&
      idx > 0 &&
      inputRefs.current[idx - 1]
    ) {
      inputRefs.current[idx - 1].focus();
    }
  };

  // move focus to another empty field after filling an empty field.
  console.log(inputRefs, "inputRefs");
  return (
    <div>
      {otp.map((value, idx) => {
        return (
          <input
            type={"text"}
            value={value}
            ref={(input) => (inputRefs.current[idx] = input)}
            onChange={(e) => onHanldeChange(idx, e)}
            onClick={(e) => onHanldeClick(idx, e)}
            onKeyDown={(e) => onHanldeKeyDown(idx, e)}
            className="otp-input"
          />
        );
      })}
    </div>
  );
};

export const PhoneNumber = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  const onHandleChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();

    const regex = /[^0-9]/g;

    if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
      alert("Invalid phone number");
      return;
    }

    setShowOtp(true);
  };

  return (
    <div>
      {!showOtp ? (
        <>
          <h3>Login with Phone</h3>
          <form onSubmit={handleOnSubmit}>
            <input
              type={"number"}
              value={phoneNumber}
              onChange={onHandleChange}
            />
            <button type="submit">Submit</button>
          </form>
        </>
      ) : (
        <div>
          Enter Otp Sent to Phone Number
          <Otp />
        </div>
      )}
    </div>
  );
};
