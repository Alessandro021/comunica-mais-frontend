import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: user ? user : null,
    error: false,
    sucess: false,
    loding: false,
};

//REGISTRO D USUSARIO E LOGIN
export const register = createAsyncThunk("auth/register", 
    async (user, thunkAPI) => {
        const data = await authService.register(user);

        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0]);
        }

        return data;
    } 
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.loding = false;
            state.error = false;
            state.sucess = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.loding = true;
            state.error = false;
        }).addCase(register.fulfilled, (state, action) => {
            state.loding = false;
            state.sucess = true;
            state.error = null;
            state.user = action.payload;
        }).addCase(register.rejected, (state, action) => {
            state.loding = false;
            state.error = action.payload;
            state.user = null;
        });
    }
});


export const {reset} = authSlice.actions;
export default authSlice.reducer;