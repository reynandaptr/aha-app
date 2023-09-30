import { ValidateUserResponse } from '@reynandaptr/aha-types/dist';
import { AuthState } from './_prototype';
import { createSlice } from '@reduxjs/toolkit';
import { LoginProvider } from '@prisma/client';

const defaultState: AuthState = {
  auth: undefined,
  loginProvider: undefined,
};


export const authSlice = createSlice({
  name: 'auth',
  initialState: defaultState,
  reducers: {
    setAuthData: (state, action: {
      payload: ValidateUserResponse | undefined | null
      type: string
    }) => {
      state.auth = action.payload;
    },
    setLoginMode: (state, action: {
      payload: LoginProvider | undefined
      type: string
    }) => {
      state.loginProvider = action.payload;
    }
  },
});

export const { setAuthData, setLoginMode } = authSlice.actions;

export default authSlice.reducer;
