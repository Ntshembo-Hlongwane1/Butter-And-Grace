import axios from "axios";

const port = process.env.PORT;
const url = process.env.PORT
  ? "https://butter-and-grace.herokuapp.com:" + port
  : "http://localhost:5000";

const instance = axios.create({
  baseURL: url,
});

export default instance;
