import axios from "axios";

async function convertNumber(number) {
  return axios.post("http://localhost:4000/convert-number", { number });
}

const conversionService = { convertNumber };

export default conversionService;
