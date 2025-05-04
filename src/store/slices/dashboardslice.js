import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    totalCourses: 0, // Initial value
    totalEnrolledUsers: 0, // Initial value
  },
  reducers: {
    setMetrics(state, action) {
      state.totalCourses = action.payload.totalCourses;
      state.totalEnrolledUsers = action.payload.totalEnrolledUsers;
    },
  },
});

export const { setMetrics } = dashboardSlice.actions;
export default dashboardSlice.reducer;