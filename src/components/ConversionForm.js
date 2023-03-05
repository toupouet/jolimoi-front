import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import conversionActions from "../store/actions/conversion.actions";

function ConversionForm() {
  const dispatch = useDispatch();

  const [number, setNumber] = useState(0);
  const [fieldError, setFieldError] = useState("");
  const [eventSource, setEventSource] = useState(undefined);
  const [eventSourceData, setEventSourceData] = useState(undefined);

  useEffect(() => {
    if (!eventSource) {
      const eventSourceOpen = new EventSource(
        "http://localhost:4000/live-event"
      );

      eventSourceOpen.onopen = () => {
        console.log("opened");
      };

      setEventSource(eventSourceOpen);
    }
  }, [eventSource]);

  useEffect(() => {
    if (eventSource) {
      eventSource.onmessage = (e) => {
        setEventSourceData(JSON.parse(e.data));
      };
    }
  }, [eventSource]);

  useEffect(() => {
    if (eventSourceData) {
      dispatch(conversionActions.setConvertedNumber(eventSourceData));
    }
  }, [dispatch, eventSourceData]);

  const perfomConversion = () => {
    dispatch(conversionActions.refreshStore());
    const { validForm } = checkNumberValidity(number, setFieldError);

    if (validForm) {
      dispatch(conversionActions.convertNumber(number));
      setFieldError("");
    }
  };

  const handleChange = (e) => {
    const formattedValue = e.target.value.replace(/\D/g, "");
    setNumber(formattedValue);
  };

  return (
    <div>
      <form>
        <label>Enter your number between 0 and 100 : </label>
        <input value={number} onChange={handleChange} />
      </form>

      <button onClick={perfomConversion}>Convert number</button>

      {fieldError && <p style={{ color: "red" }}>{fieldError}</p>}
    </div>
  );
}

function checkNumberValidity(number, setFieldError) {
  let validForm = true;

  if (number < 0 || number > 100) {
    setFieldError("Your number have to be between 0 and 100");
    validForm = false;
  }

  return { validForm };
}

export default ConversionForm;
