  import { configureStore } from "@reduxjs/toolkit";
  import dashboardReducer from "./slices/dashboardslice";
  import userSliceReducer from "./slices/userSlice"; // Import the user slice reducer
  const store = configureStore({
    reducer: {
      Dashboard: dashboardReducer, 
      user: userSliceReducer
    },
  });

  export default store;