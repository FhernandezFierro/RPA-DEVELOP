import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "checking", // 'checking' 'not-authenticated', 'authenticated'
    id_usuario: null,
    email: null,
    nombre: null,
    apellido: null,
    role: null,
    jwt_token: null,
    tribunal: {},
    errorMessage: null,
  },
  reducers: {
    login: (state, { payload }) => {
      state.status = "authenticated"; // 'checking' 'not-authenticated', 'authenticated'
      state.id_usuario = payload.id_usuario;
      state.email = payload.email;
      state.nombre = payload.nombre;
      state.apellido = payload.apellido;
      state.role = payload.role;
      state.jwt_token = payload.token;
      state.tribunal = {
        id_tribunal: payload.id_tribunal,
        nombre_tribunal: payload.nombre_tribunal,
        id_area: payload.id_area,
        ip: payload.ip,
        codigo_tribunal: payload.codigo_tribunal,
        user_sitci: payload.user_sitci,
        pass_sitci: payload.pass_sitci,
      };
      state.errorMessage = null;
    },
    logout: (state, { payload }) => {
      state.status = "not-authenticated"; // 'checking' 'not-authenticated', 'authenticated'
      state.id_usuario = null;
      state.email = null;
      state.nombre = null;
      state.apellido = null;
      state.role = null;
      state.jwt_token = null;
      // state.id_tribunal = null;
      state.tribunal = null;
      state.errorMessage = payload;
    },
    checkingCredentials: (state) => {
      state.status = "checking";
    },
    updateTribunalAuth: (state, { payload }) => {
      state.tribunal.id_area = payload.id_area;
      state.tribunal.nombre_tribunal = payload.nombre;
      state.tribunal.codigo_tribunal = payload.codigoTribunal;
      state.tribunal.ip = payload.ip;
    },
    updateUsuarioAuth: (state, { payload }) => {
      state.nombre = payload.nombre;
      state.apellido = payload.apellido;
      state.email = payload.email;
      state.role = payload.role;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  login,
  logout,
  checkingCredentials,
  updateTribunalAuth,
  updateUsuarioAuth,
} = authSlice.actions;
