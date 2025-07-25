import { createSlice } from "@reduxjs/toolkit";

export const rpaSlice = createSlice({
  name: "rpa",
  initialState: {
    isConnected:'warning', // warning | success | error
    isLoading: false,
    areas: [],
    usuarios: [{ tipo_usuario: "user" }],
    tribunales: [],
    listarobots: [],
    robotsTribunal:[],
    historial:[],
  },
  reducers: {
    setIsLoading: (state, { payload }) => {
      state.isLoading = true;
    },
    // CRUD AREAS
    setAreas: (state, { payload }) => {
      state.areas = payload;
    },
    addArea: (state, { payload }) => {
      state.areas.push(payload);
    },
    updateArea: (state, { payload }) => {
      state.areas = state.areas.map((area) => {
        if (area.id_area === payload.id_area) {
          return { ...area, nombre_area: payload.value };
        }
        return area;
      });
    },
    deleteArea: (state, { payload }) => {
      state.areas = state.areas.filter(
        (area) => area.id_area !== payload.id_area
      );
    },
    // CRUD USUARIOS
    setUsuarios: (state, { payload }) => {
      state.usuarios = payload;
    },
    addUsuario: (state, { payload }) => {
      state.usuarios.push(payload);
    },
    deleteUsuario: (state, { payload }) => {
      state.usuarios = state.usuarios.filter(
        (usuario) => usuario.id_usuario !== payload
      );
    },
    updateUsuario: (state, { payload }) => {
      state.usuarios = state.usuarios.map((usuario) => {
        if (usuario.id_usuario === payload.id_usuario) {
          return {
            ...usuario,
            nombre: payload.nombre,
            apellido: payload.apellido,
            rut: payload.rut,
            correo: payload.correo,
            tipo_usuario: payload.tipo_usuario,
          };
        }
        return usuario;
      });
    },
    // CRUD TRIBUNALES
    setTribunales: (state, { payload }) => {
      state.tribunales = payload;
    },
    addTribunal: (state, { payload }) => {
      state.tribunales.push(payload);
    },
    deleteTribunal: (state, { payload }) => {
      state.tribunales = state.tribunales.filter(
        (tribunal) => tribunal.id_tribunal !== payload
      );
    },
    updateTribunal: (state, { payload }) => {
      state.tribunales = state.tribunales.map((tribunal) => {
        if (tribunal.id_tribunal === payload.id_tribunal) {
          return {
            ...tribunal,
            nombre: payload.nombre,
            codigo_tribunal: payload.codigoTribunal,
            ip: payload.ip,
            id_area: payload.id_area,
          };
        }
        return tribunal;
      });
    },
    // CRUD LISTAROBOTS
    setListarobot: (state, { payload }) => {
      state.listarobots = payload;
    },
    addListaRobot: (state, { payload }) => {
      state.listarobots.push(payload);
    },
    deleteListarobot: (state, { payload }) => {
      state.listarobots = state.listarobots.filter(
        (listarobot) => listarobot.id_listarobot !== payload
      );
    },
    updateListarobot: (state, { payload }) => {
      state.listarobots = state.listarobots.map((listarobot) => {
        if (listarobot.id_listarobot === payload.id_listarobot) {
          return {
            ...listarobot,
            nombre_listarobot: payload.nombre_listarobot,
            id_area: payload.id_area,
            nombre_area: payload.nombre_area,
            id_listarobot: payload.id_listarobot,
          };
        }
        return listarobot;
      });
    },
    // ROBOTS TRIBUNAL
    setRobotsTribunal: (state, { payload }) => {
      state.robotsTribunal = payload;
    },
    addRobot: (state, { payload }) => {
      state.robotsTribunal.push(payload);
    },
    updateDisponibilidadRobot: (state, { payload }) => {
      state.robotsTribunal = state.robotsTribunal.map((robot) => {
        if (robot.id_robot === payload.id_robot) {
          return { ...robot, disponibilidad: payload.disponibilidad };
        }
        return robot;
      });
    },
    deleteRobot: (state, {payload}) => {
      state.robotsTribunal = state.robotsTribunal.filter(
        (robot) => robot.id_robot !== payload
      );
    },
    // EJECUCION DE ROBOTS
    checkConnection: (state, {payload}) => {
      state.isConnected = payload;
    },
    //HISTORIAL
    setHistorial: (state, { payload }) => {
      state.historial = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setIsLoading,
  setAreas,
  addArea,
  deleteArea,
  updateArea,
  setUsuarios,
  addUsuario,
  deleteUsuario,
  updateUsuario,
  setTribunales,
  addTribunal,
  deleteTribunal,
  updateTribunal,
  setListarobot,
  addListaRobot,
  deleteListarobot,
  updateListarobot,
  setRobotsTribunal,
  addRobot,
  updateDisponibilidadRobot,
  deleteRobot,
  checkConnection,
  setHistorial,
} = rpaSlice.actions;
