import { rpaApi } from "../../api/rpaApi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { addListaRobot, deleteListarobot, setListarobot, updateListarobot } from "./rpaSlice";
const MySwal = withReactContent(Swal);

export const startGetListarobots = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("rpa-jwt");
      const result = await rpaApi.get(`/getListarobots`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setListarobot(result.data.message));
    } catch (error) {
      console.log(error);
    }
  };
};

export const startAddNewListaRobot = ({
  nombreLrobot,
  areaLrobot,
  nombreArea,
}) => {
  return async (dispatch) => {
    const f = new FormData();
    f.append("nombre_listarobot", nombreLrobot);
    f.append("id_area", areaLrobot);
    const token = window.localStorage.getItem("rpa-jwt");
    try {
      const res = await rpaApi.post(`/createListarobot/`, f, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(
        addListaRobot({
          id_listarobot: res.data.message.message.id_listarobot,
          nombre_listarobot: res.data.message.message.nombre_listarobot,
          id_area: res.data.message.message.id_area,
          nombre_area: nombreArea,
        })
      );
      MySwal.fire(
        "¡Bien!",
        `Se ha agregado el robot ${res.data.message.nombre_listarobot} con éxito en la competencia ${nombreArea}.`,
        "success"
      );
    } catch (error) {
      MySwal.fire("¡Algo ha salido mal!", error.response.data.message, "error");
    }
  };
};

export const startDeleteListarobot = ({ id_listarobot, nombre_listarobot }) => {
  return async (dispatch) => {
    const f = new FormData();
    f.append("id_listarobot", id_listarobot);
    const token = window.localStorage.getItem("rpa-jwt");
    try {
      const { status } = await rpaApi.post(`/deleteListarobot/`, f, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      if (status === 200) {
        dispatch(deleteListarobot(id_listarobot));
        MySwal.fire(
          "¡Eliminado!",
          `${nombre_listarobot} ha sido eliminado con éxito.`,
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

export const startUpdateListarobot = ({
  nombreLrobot,
  areaLrobot,
  nombreArea,
  id_listarobot,
}) => {
  return async (dispatch) => {
    const f = new FormData();
    f.append("id_listarobot", id_listarobot);
    f.append("nombre_listarobot", nombreLrobot);
    f.append("id_area", areaLrobot);
    const token = window.localStorage.getItem("rpa-jwt");
    try {
      const {
        data: { message },
      } = await rpaApi.post(`/updateListarobot/`, f, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = {
        nombre_listarobot: nombreLrobot,
        id_area: areaLrobot,
        nombre_area:nombreArea,
        id_listarobot:id_listarobot

      }
      dispatch(updateListarobot(data));
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
