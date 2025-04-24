import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as Auth from '@/app/services/auth.service'
import handleError from "@/app/utils/errorhandler";
import { createUser } from "@/app/services/user.service";


export interface AuthState {
  authToken: string | null;
  status: boolean,
  uid: string | null,
  loading: boolean;
  error: string
}


const initalState: AuthState = {
  authToken: null,
  status: false,
  uid: null,
  loading: false,
  error: "",
};


export const authSlice = createSlice({
  name: "auth",
  initialState: initalState,
  reducers: {
    reset: () => initalState
  },

  extraReducers: (builder) => {
     builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.error = ''
    });
    builder.addCase(register.fulfilled, (state) => {
      state.loading = false;
      state.status = true;
    });
    builder.addCase(register.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = ''
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.status = true;
      state.authToken = action.payload.accessToken;
      state.uid = action.payload.uid;
    });
    builder.addCase(login.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false,
      state.error = action.payload;
    });
    builder.addCase(loginGoogle.pending, (state) => {
      state.loading = true;
      state.error = "";
    });    
    builder.addCase(loginGoogle.fulfilled, (state, action) => {
      state.loading = false;
      state.status = true;
      state.authToken = action.payload.accessToken;
      state.uid = action.payload.uid;
    });    
    builder.addCase(loginGoogle.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(loginFacebook.pending, (state) => {
      state.loading = true;
      state.error = "";
    });    
    builder.addCase(loginFacebook.fulfilled, (state, action) => {
      state.loading = false;
      state.status = true;
      state.authToken = action.payload.accessToken;
      state.uid = action.payload.uid;
    });    
    builder.addCase(loginFacebook.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const login = createAsyncThunk(
  "auth-login",
  async (formData: {email: string, password: string}, thunkAPI) => {
    try {
        const response = await Auth.Login(formData.email, formData.password)
        if(!response){
            return thunkAPI.rejectWithValue("Unknown error occurred");
        }
        const uid = response.uid
        const accessToken = response.accessToken
        return {
            uid,
            accessToken
        };
    } catch (error: any) {
        const errorMessgae = handleError(error)
        return thunkAPI.rejectWithValue(errorMessgae);
    }
  }
);

export const loginGoogle = createAsyncThunk(
  "auth-google-login",
  async (_, thunkAPI) => {
    try {
      const response = await Auth.handleGoogleLogin();
      if (!response) {
        return thunkAPI.rejectWithValue("Unknown error occurred");
      }

      return {
        uid: response.uid,
        accessToken: response.accessToken,
      };
    } catch (error: any) {
      const errorMessage = handleError(error);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const loginFacebook = createAsyncThunk(
  "auth-facebook-login",
  async (_, thunkAPI) => {
    try {
      const response = await Auth.handleFacebookLogin();
      if (!response) {
        return thunkAPI.rejectWithValue("Unknown error occurred");
      }

      return {
        uid: response.uid,
        accessToken: response.accessToken,
      };
    } catch (error: any) {
      const errorMessage = handleError(error);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);


export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (email: string, thunkAPI) => {
    console.log('ENTRE EN RESETpASWWORD')
    try {
      await Auth.resetPasswordUser(email);
      return `Se ha enviado un enlace de restablecimiento a ${email}`;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const register = createAsyncThunk(
  "auth-register",
  async (formData: {email: string, password: string, firstName: string, lastName: string}, thunkAPI) => {
    try {
        const response = await Auth.Signup(formData.email, formData.password)
        if(!response){
            return thunkAPI.rejectWithValue("Unknown error occurred");
        }
        const User = {
            user_id: response.user.uid,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: response.user.email,
            updatedAt: new Date().toISOString(),
            createdAt: new Date().toISOString()
        }
        await createUser(User)
        return null;
    } catch (error: any) {
        const errorMessgae = handleError(error)
        return thunkAPI.rejectWithValue(errorMessgae);
    }
  }
);

export const { reset } = authSlice.actions;

export default authSlice.reducer;