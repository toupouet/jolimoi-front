import { SET_CONVERTED_NUMBER, REFRESH_STORE } from "../types/conversion.types";

function initState() {
  return {
    romanNumber: "",
  };
}

export default function conversionReducer(state = initState(), action) {
  if (action.type === REFRESH_STORE) {
    return { romanNumber: "" };
  } else if (action.type === SET_CONVERTED_NUMBER) {
    return { romanNumber: action.payload?.convertedNumber };
  }

  return state;
}
