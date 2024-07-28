import { configureStore }  from "@reduxjs/toolkit";
import employee from "./store/reducer/employee";

export default configureStore(
    {
         reducer: {employee} //<--all reducers entry goes here
    }
)