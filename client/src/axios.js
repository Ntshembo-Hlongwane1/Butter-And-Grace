import axios from "axios";

const port = process.env.PORT;
const url = process.env.PORT
  ? "https://butter-and-grace.herokuapp.com:" + port
  : "http://localhost:5000";

const production_url = "https://butter-and-grace.herokuapp.com:" + port;
const instance = axios.create({
  baseURL: production_url,
});

export default instance;
