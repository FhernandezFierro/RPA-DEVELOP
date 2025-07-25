// import { login, logout } from "./";
import { rpaApi } from "../../api/rpaApi";
import { setAreas, addArea, deleteArea, updateArea } from "./rpaSlice";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

// -------------- CRUD AREAS ------------------

export const startGetAreas = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("rpa-jwt");
      const result = await rpaApi.get(`/getAreas`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setAreas(result.data.message));
    } catch (error) {
      console.log(error);
    }
  };
};

export const startAddNewArea = (newArea) => {
  return async (dispatch) => {
    const f = new FormData();
    f.append("nombre_area", newArea);
    const token = window.localStorage.getItem("rpa-jwt");
    try {
      const {data:{message}} = await rpaApi.post(`/addNewArea`, f, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(addArea(message));
      MySwal.fire(
        "¡Bien!",
        `El área ${newArea} ha sido agregada con éxito.`,
        "success"
      );
    } catch (error) {
      MySwal.fire(
        "¡Algo ha salido mal!",
        `El área ${newArea} no ha podido ser agregada.`,
        "error"
      );
    }
  };
};

export const startUpdateArea = ({ id_area, nombre_area, value }) => {
  return async (dispatch) => {
    const f = new FormData();
    f.append("id_area", id_area);
    f.append("nombre_area", nombre_area);
    f.append("nuevo_nombre", value);
    const token = window.localStorage.getItem("rpa-jwt");
    try {
      const { status } = await rpaApi.post(`/updateArea`, f, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      if(status === 200) {
        dispatch(updateArea({id_area, value}));
        MySwal.fire(
          "¡Actualizado!",
          `El área ${nombre_area} fue modificada por ${value} con éxito.`,
          "success"
        );
      }
    } catch (error) {
      MySwal.fire(
        "¡Algo ha salido mal!",
        `El área ${nombre_area} no ha podido ser modificada.`,
        "error"
      );
    }
  };
};

export const startDeleteArea = ({ id_area, nombre_area }) => {
  return async (dispatch) => {
    const f = new FormData();
    f.append("id_area", id_area);
    f.append("nombre_area", nombre_area);
    const token = window.localStorage.getItem("rpa-jwt");
    try {
      const { status } = await rpaApi.post(`/deleteArea/`, f, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      if (status === 200) {
        dispatch(deleteArea({ id_area, nombre_area }));
        MySwal.fire(
          "¡Eliminado!",
          `El área ${nombre_area} ha sido eliminada con éxito.`,
          "success"
        );
      }
    } catch (error) {
      MySwal.fire(
        "¡Algo ha salido mal!",
        `El área ${nombre_area} no ha podido ser eliminada.`,
        "error"
      );
    }
  };
};
