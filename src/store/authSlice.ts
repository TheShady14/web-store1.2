import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";

interface AuthState {
  firstName: string | null;
  surname: string | null;
  username: string | null;
  email: string | null;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AuthState = {
  firstName: null,
  surname: null,
  username: null,
  email: null,
  isAuthenticated: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue }
  ) => {
    // Simulating an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For demo purposes, accept any non-empty username and password
    if (username && password) {
      return { username };
    }
    return rejectWithValue("Invalid username or password");
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (
    userData: {
      firstName: string;
      surname: string;
      username: string;
      email: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    // Simulating an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For demo purposes, accept any valid input
    if (
      userData.firstName &&
      userData.surname &&
      userData.username &&
      userData.email &&
      userData.password
    ) {
      return userData;
    }
    return rejectWithValue("Registration failed");
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.firstName = null;
      state.surname = null;
      state.username = null;
      state.email = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<{ username: string }>) => {
          state.username = action.payload.username;
          state.isAuthenticated = true;
          state.error = null;
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(
        register.fulfilled,
        (
          state,
          action: PayloadAction<{
            firstName: string;
            surname: string;
            username: string;
            email: string;
          }>
        ) => {
          state.firstName = action.payload.firstName;
          state.surname = action.payload.surname;
          state.username = action.payload.username;
          state.email = action.payload.email;
          state.isAuthenticated = true;
          state.error = null;
        }
      )
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
