import { createSlice } from "@reduxjs/toolkit"

export const userType_slice = createSlice({
    name: 'userType' , 
    initialState : '',
    reducers : {
        setUser_type: (state , action)=>{
            return action.payload
        }
    }
})

export const { setUser_type } = userType_slice.actions

export default userType_slice.reducer