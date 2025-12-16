import axios from "axios";
import api from "./api.json";

// Create an axios instance with JSON headers
const API = axios.create({
  baseURL: api.BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});



export { API, api };
