import { FAILED, LOGIN, REGISTER } from "../types/authTypes";
import axios from "axios";

// navigate as params from handleSubmit function in Signup component
// dispatch from middleware
export const register = (data, navigate) => async (disptatch) => {
  try {
    // Request to the server
    const res = await axios.post("/api/auth/signup", data);
    // dispatch action
    disptatch({
      type: REGISTER,
      payload: res.data,
    });
    // to profile after signup
    // navigate only after success
    navigate("/profile");
  } catch (error) {
    // failed action
    disptatch({
      type: FAILED,
    });
  }
};
// LOG IN
export const login = (data, navigate) => async (disptatch) => {
  try {
    // Request to the server
    const res = await axios.post("/api/auth/signin", data);
    // dispatch action
    disptatch({
      type: LOGIN,
      payload: res.data,
    });
    // to profile after signin
    // navigate only after success
    navigate("/profile");
  } catch (error) {
    // failed action
    disptatch({
      type: FAILED,
    });
  }
};
