import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/userService";

const initialState = {
    user: {},
    error: false,
    success: false,
    loading: false,
    message: null,
};

export const profile = createAsyncThunk("user/profile",
    async (user, thunkAPI) => {
        // const token =  thunkAPI.getState().auth.user.token;
        
        const {token} = JSON.parse(localStorage.getItem("user"));

        const data = await userService.profile(user, token);

        if(data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        }

        return data;
    }
);

export const updateProfile = createAsyncThunk("user/update", 
    async (user, thunkAPI) => {
        // const token = thunkAPI.getState().auth.user.token;
        const {token} = JSON.parse(localStorage.getItem("user"));

        const data =  await userService.updateProfile(user, token);
        
        if(data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        }

        return data;
    }
);

export const getUserDetails = createAsyncThunk("user/get",
    async(id, thunkAPI) => {
        const data = await userService.getUserDetails(id);

        if(data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        }

        return data;
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(profile.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(profile.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = action.payload;
        }).addCase(profile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.user = null;
        }).addCase(updateProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(updateProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = action.payload;
            state.message = "Usuário atualizado com sucesso.";
        }).addCase(updateProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.user = null;
        }).addCase(getUserDetails.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(getUserDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = action.payload;
        }).addCase(getUserDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.user = null;
        });
    }
});

export const {resetMessage} = userSlice.actions;
export default userSlice.reducer;