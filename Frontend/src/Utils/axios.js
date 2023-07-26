import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

export const apiInstance = axios.create({
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  },
});
