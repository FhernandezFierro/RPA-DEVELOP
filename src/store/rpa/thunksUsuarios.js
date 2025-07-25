import { rpaApi } from "../../api/rpaApi";
import { updateUsuarioAuth } from "../auth";
import { addUsuario, setUsuarios, deleteUsuario, updateUsuario } from "./rpaSlice";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const startGetUsuarios = (id_tribunal) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("rpa-jwt");
      const result = await rpaApi.get(`/getUsuarios/${id_tribunal}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setUsuarios(result.data?.message));
    } catch (error) {
      console.log(error);
    }
  };
};

export const startAddNewUsuario = (newUsuario) => {
  return async (dispatch) => {
    const f = new FormData();
    f.append("nombre", newUsuario.nombre);
    f.append("apellido", newUsuario.apellido);
    f.append("rut", newUsuario.rut);
    f.append("correo", newUsuario.correo);
    f.append("contrasena", newUsuario.contrasena);
    f.append("repiteContrasena", newUsuario.repiteContrasena);
    f.append("tipo_usuario", newUsuario.tipo_usuario);
    f.append("id_tribunal", newUsuario.id_tribunal);
    const token = window.localStorage.getItem("rpa-jwt");
    try {
      const {
        data: { message },
      } = await rpaApi.post(`/agregauser/`, f, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(addUsuario(message));
      MySwal.fire(
        "¡Bien!",
        `El usuario ${newUsuario.nombre} ${newUsuario.apellido} ha sido agregado con éxito.`,
        "success"
      );
    } catch (error) {
      console.log(error.response.data.message);
      MySwal.fire("¡Algo ha salido mal!", error.response.data.message, "error");
    }
  };
};

export const startDeleteUsuario = ({ id_usuario, nombre, apellido }) => {
  return async (dispatch) => {
    const f = new FormData();
    f.append("id_usuario", id_usuario);
    f.append("nombre", nombre);
    f.append("apellido", apellido);
    const token = window.localStorage.getItem("rpa-jwt");
    try {
      const { status } = await rpaApi.post(`/deleteUser`, f, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      if (status === 200) {
        dispatch(deleteUsuario(id_usuario));
        MySwal.fire(
          "¡Eliminado!",
          `El usuario ${nombre} ${apellido} ha sido eliminado con éxito.`,
          "success"
        );
      }
    } catch (error) {
      MySwal.fire(
        "¡Algo ha salido mal!",
        `El usuario ${nombre} ${apellido} no ha podido ser eliminado.`,
        "error"
      );
    }
  };
};

export const startUpdateUsuario = (updateUser) => {
  return async (dispatch) => {
    const f = new FormData();
    f.append("id_usuario", updateUser.id_usuario);
    f.append("nombre", updateUser.nombre);
    f.append("apellido", updateUser.apellido);
    f.append("rut", updateUser.rut);
    f.append("correo", updateUser.correo);
    f.append("tipo_usuario", updateUser.tipo_usuario);
    f.append("id_tribunal", updateUser.id_tribunal);
    const token = window.localStorage.getItem("rpa-jwt");
    try {
      const {
        data: { message },
      } = await rpaApi.post(`/updateUser/`, f, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(updateUsuario(updateUser));
      if (updateUser.id_usuario === updateUser.current_idUser) dispatch(updateUsuarioAuth(updateUser));
      MySwal.fire(
        "¡Bien!",
        `El usuario ${updateUser.nombre} ${updateUser.apellido} ha sido actualizado con éxito.`,
        "success"
      );
    } catch (error) {
      console.log(error);
      MySwal.fire("¡Algo ha salido mal!", error, "error");
    }
  };
};
