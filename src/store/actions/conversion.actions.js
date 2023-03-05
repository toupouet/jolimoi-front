import conversionService from "../services/conversion.service";
import {
  CONVERT_NUMBER_ERROR,
  CONVERT_NUMBER_REQUEST,
  CONVERT_NUMBER_SUCCESS,
  REFRESH_STORE,
  SET_CONVERTED_NUMBER,
} from "../types/conversion.types";

function convertNumber(number) {
  return (dispatch) => {
    dispatch({ type: CONVERT_NUMBER_REQUEST });

    return conversionService
      .convertNumber(number)
      .then(({ data }) => {
        dispatch({ type: CONVERT_NUMBER_SUCCESS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: CONVERT_NUMBER_ERROR, payload: error.message });
      });
  };
}

function refreshStore() {
  return (dispatch) => {
    dispatch({ type: REFRESH_STORE });
  };
}

function setConvertedNumber(eventSourceData = {}) {
  return (dispatch) => {
    dispatch({ type: SET_CONVERTED_NUMBER, payload: eventSourceData });
  };
}

const conversionActions = { convertNumber, refreshStore, setConvertedNumber };

export default conversionActions;
