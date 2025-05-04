
import axios from "axios";
import { setUser } from "../slices/userSlice";

const fetchInstructorDetails = () => async (dispatch) => {
  const token = localStorage.getItem("token");

  const response = await axios.get("http://localhost:8081/api/instructor/getProfile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  dispatch(setUser({ user: response.data }));
};

export default fetchInstructorDetails;
