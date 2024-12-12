import { configureStore } from "@reduxjs/toolkit";
import Client_slice from './slices/Client_slice'
import userType_slice from './slices/typeSlice'
import  Admin_slice  from "./slices/Admin_slice";

const store = configureStore({
    reducer: {
        client : Client_slice,
        admin : Admin_slice,
        userType: userType_slice, // when calling the state in useSelector , must be state => state.userType
    }
})

export default store