import { rpaApi } from "../../api/rpaApi";
import Swal from "sweetalert2";
import "../../styles/home.css";
import withReactContent from "sweetalert2-react-content";
import { checkConnection, setHistorial } from "./rpaSlice";
const MySwal = withReactContent(Swal);

const Toast = MySwal.mixin({
  toast: true,
  position: "top",
  iconColor: "white",
  customClass: {
    popup: "colored-toast",
  },
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true,
});

export const startCheckConnection = (id_tribunal) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("rpa-jwt");
    try {
      const f = new FormData();
      f.append("idTribunal", id_tribunal);
      const {
        data: { message },
      } = await rpaApi.post(`/checkConnect/`, f, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(checkConnection(message));
      if (message === "success") {
        Toast.fire({
          icon: message,
          title: `Conexión exitosa con el equipo remoto.`,
        });
      } else {
        Toast.fire({
          icon: message,
          title: `No se pudo establecer conexión con el equipo remoto.`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const startGetHistorial = (id_tribunal) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("rpa-jwt");
    
    try {
      const f = new FormData();
      f.append("id_tribunal", id_tribunal);
      const {
        data: { message },
      } = await rpaApi.post(`/getHistorial`, f, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setHistorial(message))
    } catch (error) {
      console.log(error);
    }
  };
};
