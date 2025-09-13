import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user') || 'null');

const slice = createSlice({
  name: 'auth',
  initialState: { token, user },
  reducers: {
    setCredentials: (state, { payload }) => {
      state.token = payload.token; state.user = payload.user;
      localStorage.setItem('token', payload.token);
      localStorage.setItem('user', JSON.stringify(payload.user));
    },
    logout: (state) => { state.token = null; state.user = null; localStorage.clear(); }
  }
});

export const { setCredentials, logout } = slice.actions;
export default slice.reducer;
