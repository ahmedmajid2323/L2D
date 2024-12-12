import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    admin_credentiels:{},
}

export const Admin_slice = createSlice({
    name:'admin' , 
    initialState ,
    reducers : {
        setAdmin_credentiels: (state , action)=>{
            return(
                {
                    ...state,
                    admin_credentiels: action.payload
                }
            )
        },

    }
})

export const { setAdmin_credentiels  } = Admin_slice.actions

export default Admin_slice.reducer