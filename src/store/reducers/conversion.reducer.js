import {
  CONVERT_NUMBER_SUCCESS,
  REFRESH_STORE,
} from "../types/conversion.types";

function initState() {
  return {
    romanNumber: "",
  };
}

export default function conversionReducer(state = initState(), action) {
  if (action.type === CONVERT_NUMBER_SUCCESS) {
    return {
      romanNumber: action.payload,
    };
  } else if (action.type === REFRESH_STORE) {
    return { romanNumber: "" };
  }

  return state;
}
