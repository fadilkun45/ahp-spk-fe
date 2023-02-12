import { createSlice } from "@reduxjs/toolkit"
import { LoginUser } from "../Service/AuthService"

const initialState = {
    loading: true,
    res: JSON.parse(localStorage.getItem('users')),
    error: '',
}

export const AuthSlice = createSlice({
    name: 'login',
    initialState,
    reducers:{
        logout: (state) => {
            state.res = '';
            state.loading = false;
            state.error = '';
        },
        loading: (state) => {
            state.loading = false;
        },
        notLoading: (state) => {
            state.loading = false;
        }
    },
    extraReducers(builder) {
        builder.addCase(LoginUser.fulfilled, (state,action) => {
            if(action.payload){
                localStorage.setItem('users',JSON.stringify(action.payload.data))
                state.loading = false;
                state.error = '';
                state.res = action.payload.data;
            }
        })
        builder.addCase(LoginUser.pending, (state,action) => {
            state.loading = true;
            state.error = '';
            state.res = '';
        })
        builder.addCase(LoginUser.rejected, (state,action) => {
            console.log(action)
            state.loading = false;
            state.error = action;
            state.res = '';
        })
    }
})

export const { logout,loading,notLoading } = AuthSlice.actions
export default AuthSlice.reducer

