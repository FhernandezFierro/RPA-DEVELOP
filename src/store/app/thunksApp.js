import { rpaApi } from "../../api/rpaApi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { setEnEjecucion, setExhortosCivil, setJueces } from "./appSlice";
import { useSelector } from "react-redux";

const MySwal = withReactContent(Swal);

export const startGetJueces = (id_tribunal) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("rpa-jwt");
      const {
        data: { message },
      } = await axios(`http://10.13.18.84:5000/getJueces/${id_tribunal}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(setJueces(message));
    } catch (error) {
      console.log(error);
    }
  };
};

export const startGetExhortosCivil = (id_tribunal) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("rpa-jwt");

      axios(`http://10.13.18.84:5000/updateDB`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + token,
        },
      });

      const {
        data: { message },
      } = await axios(`http://10.13.18.84:5000/getExhortos/${id_tribunal}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(setExhortosCivil(message));
    } catch (error) {
      console.log(error);
    }
  };
};

export const startCheckEjecucion = (id_tribunal) => {
  return async (dispatch) => {
    try {
      // console.log('Cada 5 seg',id_tribunal)
      const f = new FormData();
      f.append("id_tribunal", id_tribunal);
      const token = window.localStorage.getItem("rpa-jwt");
      const {
        data: { message },
      } = await rpaApi.post(`/getEnEjecucion/`, f, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      if (message.length == 1) {
        dispatch(
          setEnEjecucion({
            id_robot: message[0].id_robot,
            nombre_robot: message[0].nombre_listarobot,
            ejecutando: true,
          })
        );
      } else {
        dispatch(
          setEnEjecucion({
            id_robot: null,
            nombre_robot: null,
            ejecutando: false,
          })
        );
      }

      // dispatch(setExhortosCivil(message));
    } catch (error) {
      console.log(error);
    }
  };
};

export const startExeIngresoDeExhortos = ({
  email,
  user_sitci,
  pass_sitci,
  juez,
  id_robot,
  nombre_robot,
  ip,
  id_tribunal,
}) => {
  return async (dispatch) => {
    const f = new FormData();
    f.append("correo", email);
    f.append("user_sitci", user_sitci);
    f.append("pass_sitci", pass_sitci);
    f.append("juez", juez);
    f.append("ip", ip);
    f.append("id_robot", id_robot);
    f.append("id_tribunal", id_tribunal);
    const token = window.localStorage.getItem("rpa-jwt");
    try {
      dispatch(setEnEjecucion({ nombre_robot, id_robot, ejecutando: true }));
      const { data, status } = await rpaApi.post(`/ejecutaIngresoExhorto/`, f, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      if (status === 200) {
        if (data === "success") {
          MySwal.fire(
            "¡Ejecutado!",
            `${nombre_robot} ejecutado con éxito. Espera el resultado en el correo ${email}`,
            "success"
          );
        } else {
          MySwal.fire(
            "¡Error!",
            `Ocurrió un error ejecutando el robot ${nombre_robot}. Revisa el correo ${email} para más detalles`,
            "error"
          );
        }
        dispatch(
          setEnEjecucion({
            nombre_robot: null,
            id_robot: null,
            ejecutando: false,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const startExeDevolucionDeExhortos = ({
  email,
  user_sitci,
  pass_sitci,
  juez,
  id_robot,
  nombre_robot,
  ip,
  id_tribunal,
  archivo,
  id_listarobot,
}) => {
  return async (dispatch) => {
    const f = new FormData();
    f.append("correo", email);
    f.append("user_sitci", user_sitci);
    f.append("pass_sitci", pass_sitci);
    f.append("juez", juez);
    f.append("ip", ip);
    f.append("id_robot", id_robot);
    f.append("id_tribunal", id_tribunal);
    f.append("archivo", archivo);
    f.append("id_listarobot", id_listarobot);
    const token = window.localStorage.getItem("rpa-jwt");
    try {
      dispatch(setEnEjecucion({ nombre_robot, id_robot, ejecutando: true }));
      const { data, status } = await rpaApi.post(
        `/ejecutaDevolucionExhorto/`,
        f,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (status === 200) {
        console.log(data);
        if (data === "success") {
          MySwal.fire(
            "¡Ejecutado!",
            `${nombre_robot} ejecutado con éxito. Espera el resultado en el correo ${email}`,
            "success"
          );
        } else {
          MySwal.fire(
            "¡Error!",
            `Ocurrió un error ejecutando el robot ${nombre_robot}. Revisa el correo ${email} para más detalles`,
            "error"
          );
        }
        dispatch(
          setEnEjecucion({
            nombre_robot: null,
            id_robot: null,
            ejecutando: false,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const startExeArchivosFamilia = ({
  email,
  user_sitfa,
  pass_sitfa,
  juez,
  id_robot,
  nombre_robot,
  ip,
  id_tribunal,
  archivo,
  id_listarobot
}) => {
  return async (dispatch) => {
    const f = new FormData();
    f.append("correo", email);
    f.append("user_sitfa", user_sitfa);
    f.append("pass_sitfa", pass_sitfa);
    f.append("juez", juez);
    f.append("ip", ip);
    f.append("id_robot", id_robot);
    f.append("id_tribunal", id_tribunal);
    f.append("archivo", archivo);
    f.append("id_listarobot", id_listarobot);
    const token = window.localStorage.getItem("rpa-jwt");
    try {
      dispatch(setEnEjecucion({ nombre_robot, id_robot, ejecutando: true }));
      const { data, status } = await rpaApi.post(
        `/ejecutaRobotArchivoFamilia/`,
        f,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (status === 200) {
        console.log(data);
        if (data === "success") {
          MySwal.fire(
            "¡Ejecutado!",
            `${nombre_robot} ejecutado con éxito. Espera el resultado en el correo ${email}`,
            "success"
          );
        } else {
          MySwal.fire(
            "¡Error!",
            `Ocurrió un error ejecutando el robot ${nombre_robot}. Revisa el correo ${email} para más detalles`,
            "error"
          );
        }
        dispatch(
          setEnEjecucion({
            nombre_robot: null,
            id_robot: null,
            ejecutando: false,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const startExeGestionDeSii = ({
  email,
  user_sii,
  pass_sii,
  id_robot,
  nombre_robot,
  ip,
  id_tribunal,
  archivo,
  id_listarobot,
}) => {
  return async (dispatch) => {
    const f = new FormData();

    f.append("correo", email);
    f.append("user_sii", user_sii);
    f.append("pass_sii", pass_sii);
    f.append("ip", ip);
    f.append("id_robot", id_robot);
    f.append("id_tribunal", id_tribunal);
    f.append("id_listarobot", id_listarobot);
    f.append("archivo", archivo);
    const token = window.localStorage.getItem("rpa-jwt");
    try {
      dispatch(setEnEjecucion({ nombre_robot, id_robot, ejecutando: true }));
      const { data, status } = await rpaApi.post(`/ejecutaRobotGestSii/`, f, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(status);
      if (status === 200) {
        console.log(data);
        if (data === "success") {
          MySwal.fire(
            "¡Ejecutado!",
            `${nombre_robot} ejecutado con éxito. Espera el resultado en el correo ${email}`,
            "success"
          );
        } else {
          MySwal.fire(
            "¡Error!",
            `Ocurrió un error ejecutando el robot ${nombre_robot}. Revisa el correo ${email} para más detalles`,
            "error"
          );
        }
        dispatch(
          setEnEjecucion({
            nombre_robot: null,
            id_robot: null,
            ejecutando: false,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const startExeInformeActivoFijo = ({
  email,
  user_cgu,
  pass_cgu,
  id_robot,
  nombre_robot,
  ip,
  id_tribunal,
  id_listarobot,
  cen_fin,
}) => {
  return async (dispatch) => {
    const f = new FormData();

    f.append("correo", email);
    f.append("user_cgu", user_cgu);
    f.append("pass_cgu", pass_cgu);
    f.append("ip", ip);
    f.append("id_robot", id_robot);
    f.append("id_tribunal", id_tribunal);
    f.append("id_listarobot", id_listarobot);
    f.append("cen_fin", cen_fin);
    const token = window.localStorage.getItem("rpa-jwt");
    try {
      dispatch(setEnEjecucion({ nombre_robot, id_robot, ejecutando: true }));
      const { data, status } = await rpaApi.post(
        `/ejecutaInformeActivosFijos/`,
        f,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (status === 200) {
        console.log(data);
        if (data === "success") {
          MySwal.fire(
            "¡Ejecutado!",
            `${nombre_robot} ejecutado con éxito. Espera el resultado en el correo ${email}`,
            "success"
          );
        } else {
          MySwal.fire(
            "¡Error!",
            `Ocurrió un error ejecutando el robot ${nombre_robot}. Revisa el correo ${email} para más detalles`,
            "error"
          );
        }
        dispatch(
          setEnEjecucion({
            nombre_robot: null,
            id_robot: null,
            ejecutando: false,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const startExeTranscripcion = ({ email, id_tribunal, archivo }) => {
  return async (dispatch) => {
    console.log(email, id_tribunal, archivo);
    const f = new FormData();
    f.append("correo", email);
    f.append("id_tribunal", id_tribunal);
    f.append("archivo", archivo);
    f.append("nombre_archivo", archivo.name);
    const token = window.localStorage.getItem("rpa-jwt");
    try {
      // dispatch(setEnEjecucion({ nombre_robot, id_robot, ejecutando: true }));
      MySwal.fire({
        icon: "info",
        title: "Se enviará el audio al servidor...",
        text: "Esto podría tomar unos minutos. No cierres esta página.",
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          const { data, status } = await rpaApi.post(`/transcribeText`, f, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          });
          if (status === 200) {
            if (data === "success") {
              MySwal.fire(
                "¡Ejecutado!",
                `Transcripción ejecutada con éxito. Espera el resultado en el correo ${email}`,
                "success"
              );
            } else {
              MySwal.fire(
                "¡Error!",
                `Ocurrió un error al realizar la transcripción. Revisa el correo ${email} para más detalles`,
                "error"
              );
            }
            dispatch(
              setEnEjecucion({
                nombre_robot: null,
                id_robot: null,
                ejecutando: false,
              })
            );
          }
        },
        allowOutsideClick: () => !MySwal.isLoading(),
      });
    } catch (error) {
      console.log(error);
    }
  };
};
