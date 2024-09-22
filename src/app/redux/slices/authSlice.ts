import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthState, IUserLoginRequest, IUserLoginResponse } from "../../../models/login.model";
import { IUserRegister } from "../../../models/register.model";

// Estado inicial
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Acción asíncrona para iniciar sesión
export const loginUser = createAsyncThunk<IUserLoginResponse, IUserLoginRequest>(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://skillswapriwi.azurewebsites.net/api/Auth/PostAuthLogin",
        {
          method: "POST",
          headers: {
            "accept": "*/*",
            "Content-Type": "application/json",
            // Agregar token aquí si es necesario para la autenticación
            "Authorization": `Bearer ${localStorage.getItem('authToken')}`
          },
          body: JSON.stringify(credentials),
        }
      );

      if (!response.ok) {
        // Si la respuesta no es correcta (4xx o 5xx)
        const errorData = await response.json();
        return rejectWithValue(errorData.error.message || "An error occurred");
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      // Si hay un error de red u otro problema
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

// Acción asíncrona para registro
export const registerUser = createAsyncThunk<IUserLoginResponse, IUserRegister>(
  "auth/registerUser",
  async (newUser, { rejectWithValue }) => {
    try {
      const response = await fetch("https://skillswapriwi.azurewebsites.net/api/UsersPost/PostUserCreate", {
        method: "POST",
        headers: {
          "accept": "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        // Si la respuesta no es exitosa (4xx o 5xx)
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "An error occurred");
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      // Si hay un error de red u otro problema
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

// Slice de Redux
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId"); 
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<IUserLoginResponse>) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem("authToken", action.payload.data.token);
        localStorage.setItem("userId", action.payload.data.id.toString()); 
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<IUserLoginResponse>) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

// Exporta las acciones y el reducer
export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
