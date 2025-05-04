import axios from "axios";
import { setMetrics } from "../slices/dashboardslice";

const fetchDashboard = () => async (dispatch) => {
  
  console.log("Sending token:", `Bearer ${localStorage.getItem("token")}`);

    const response = await axios.get("http://localhost:8081/api/instructor/dashboard/metrics",
      {
        headers: {
           
       Authorization: `Bearer ${localStorage.getItem("token")}`,
          
        },
      }
    );
    dispatch(setMetrics({
      totalCourses: response.data.totalCourses,
      totalEnrolledUsers: response.data.totalEnrolledUsers,
    }));
  
};

export default fetchDashboard;