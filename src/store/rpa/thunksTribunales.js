import { rpaApi } from "../../api/rpaApi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  addTribunal,
  deleteTribunal,
  setTribunales,
  updateTribunal,
} from "./rpaSlice";
import { updateTribunalAuth } from "../auth";
import { useSelector } from "react-redux";

const MySwal = withReactContent(Swal);

export const startGetTribunales = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("rpa-jwt");
      const result = await rpaApi.get(`/getTribunal`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setTribunales(result.data?.message));
    } catch (error) {
      console.log(error);
    }
  };
};

export const startAddNewTribunal = (newTribunal) => {
  return async (dispatch) => {
    const f = new FormData();
    f.append("nombre_tribunal", newTribunal.nombre_tribunal);
    f.append("codigo_tribunal", newTribunal.codigo_tribunal);
    f.append("ip", newTribunal.ip);
    f.append("id_area", newTribunal.id_area);
    f.append("user_sitci", "");
    f.append("pass_sitci", "");
    const token = window.localStorage.getItem("rpa-jwt");
    try {
      const {
        data: { message },
      } = await rpaApi.post(`/createTribunal/`, f, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(addTribunal(message));
      MySwal.fire(
        "¡Bien!",
        `Se ha agregado ${message.nombre_tribunal} con éxito.`,
        "success"
      );
    } catch (error) {
      console.log(error.response.data.message);
      MySwal.fire("¡Algo ha salido mal!", error.response.data.message, "error");
    }
  };
};

export const startDeleteTribunal = ({ id_tribunal, nombre }) => {
  return async (dispatch) => {
    const f = new FormData();
    f.append("id_tribunal", id_tribunal);
    const token = window.localStorage.getItem("rpa-jwt");
    try {
      const { status } = await rpaApi.post(`/deleteTribunal/`, f, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      if (status === 200) {
        dispatch(deleteTribunal(id_tribunal));
        MySwal.fire(
          "¡Eliminado!",
          `${nombre} ha sido eliminado con éxito.`,
          "success"
        );
      }
    } catch (error) {
      MySwal.fire(
        "¡Algo ha salido mal!",
        `${nombre} no ha podido ser eliminado.`,
        "error"
      );
    }
  };
};

export const startUpdateTribunal = (updTribunal) => {
  return async (dispatch) => {
    const f = new FormData();
    f.append("id_tribunal", updTribunal.id_tribunal);
    f.append("nombre_tribunal", updTribunal.nombre);
    f.append("codigo_tribunal", updTribunal.codigoTribunal);
    f.append("ip", updTribunal.ip);
    f.append("id_area", updTribunal.id_area);
    f.append("user_sitci", "");
    f.append("pass_sitci", "");
    console.log(updTribunal.current_tribunal)
    const token = window.localStorage.getItem("rpa-jwt");
    try {
      const {
        data: { message },
      } = await rpaApi.post(`/updateTribunal/`, f, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(updateTribunal(updTribunal));
      if(updTribunal.id_tribunal === updTribunal.current_tribunal) dispatch(updateTribunalAuth(updTribunal));
      
      MySwal.fire(
        "¡Bien!",
        `El Tribunal ha sido actualizado con éxito.`,
        "success"
      );
    } catch (error) {
      console.log(error);
      MySwal.fire("¡Algo ha salido mal!", error, "error");
    }
  };
};
