import React, { useEffect, useRef, useState } from "react";
import "./App.css";

const OTP_DIGIT_COUNT = 5;

const App = () => {
  const [otpArr, setOtpArr] = useState(new Array(OTP_DIGIT_COUNT).fill(""));
  const refInput = useRef([]);

  useEffect(() => {
    refInput.current[0]?.focus();
  }, []);

  const handelOnChnage = (value, index) => {
    if (isNaN(value)) return;

    //If you mutate the array directly, the reference stays the same:
    // So React may skip the re-render, and your input won't update as expected.

    // otpArr[index] = value;
    // setOtpArr(otpArr);

    const newValue = value.trim();
    const newArr = [...otpArr];
    newArr[index] = newValue.slice(-1);
    setOtpArr(newArr);
    newValue && refInput.current[index + 1]?.focus();
  };

  const onKeyPress = (e, index) => {
    console.log(e);
    if (!e.target.value && e.key === "Backspace") {
      refInput.current[index - 1]?.focus();
    }
  };

  return (
    <div className="app">
      <h1>OTP input field</h1>
      <div className="app__otpInput">
        {otpArr.map((arr, index) => (
          <input
            type="text"
            key={index}
            value={otpArr[index]}
            ref={(input) => (refInput.current[index] = input)}
            onChange={(e) => handelOnChnage(e.target.value, index)}
            onKeyDown={(e) => onKeyPress(e, index)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
