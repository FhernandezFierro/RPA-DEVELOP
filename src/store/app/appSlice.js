import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    navbarText: "Home",
    jueces: [],
    exhortosCivil: [],
    enEjecucion: {
      id_robot: null,
      nombre_robot: null,
      ejecutando: false,
    },
    donutSeries: [],
    lineSeries:[],
    robotSelected:"",
  },
  reducers: {
    setNavbarText: (state, { payload }) => {
      state.navbarText = payload;
    },
    setJueces: (state, { payload }) => {
      state.jueces = payload;
    },
    setExhortosCivil: (state, { payload }) => {
      state.exhortosCivil = payload;
    },
    setEnEjecucion: (state, { payload }) => {
      state.enEjecucion = payload;
    },
    setDonutSeries: (state, { payload }) => {
      state.donutSeries = payload;
    },
    setLineSeries: (state, { payload }) => {
      state.lineSeries = payload;
    },
    setRobotSelected: (state, { payload }) => {
      state.robotSelected = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setNavbarText,
  setJueces,
  setExhortosCivil,
  setEnEjecucion,
  setDonutSeries,
  setLineSeries,
  setRobotSelected,
} = appSlice.actions;
