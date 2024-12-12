import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    account_status: '',
    client_credentiels:{},
}

export const Client_slice = createSlice({
    name:'client' , 
    initialState ,
    reducers : {
        setAccount_status: (state , action)=>{
            state.account_status = action.payload
        },
        setUser_credentiels: (state , action)=>{
            return(
                {
                    ...state,
                    client_credentiels: action.payload
                }
            )
        },

    }
})

export const { setAccount_status , setUser_credentiels } = Client_slice.actions

export default Client_slice.reducer