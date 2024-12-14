import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    admin_credentiels:{},
    admin_agenda:[],
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
        setAdmin_agenda : (state , action)=>{
            return(
                {
                    ...state,
                    admin_agenda: action.payload
                }
            )
        },
        addTask_state : (state , action)=>{
            const client_agenda = state.admin_agenda
            const title = action.payload.title
            const data = action.payload.data
            const titleIndex = client_agenda.findIndex(item => item.title === title);
            if (titleIndex !== -1) {
                client_agenda[titleIndex].data.push(data);
            } else {
                client_agenda.push({
                    title,
                    data: [data],
                });
            }
        },
    }
})

export const { setAdmin_credentiels  , setAdmin_agenda , addTask_state  } = Admin_slice.actions

export default Admin_slice.reducer