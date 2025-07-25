import { rpaApi } from "../../api/rpaApi";
import { addRobot, deleteRobot, setRobotsTribunal, updateDisponibilidadRobot } from "./rpaSlice";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
export const startSetRobots = (id_tribunal) => {
    return async (dispatch) => {
      const f = new FormData();
      f.append("id_tribunal", id_tribunal);
      const token = window.localStorage.getItem("rpa-jwt");
      try {
        const {data:{message}} = await rpaApi.post(`/getRobots/`, f, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(setRobotsTribunal(message));
      } catch (error) {
        console.log(error);
      }
    };
  };

  export const startAsociaRobot = (id_area, id_listarobot, nombre_area, nombre_listarobot, trib, setRobots, robots) => {
    return async (dispatch) => {
      const f = new FormData();
      
      f.append("id_listarobot", id_listarobot);
      f.append("id_tribunal", trib);
      const token = window.localStorage.getItem("rpa-jwt");
      try {
        const {data:{message}} = await rpaApi.post(`/createRobot/`, f, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(
          addRobot({
            id_listarobot: id_listarobot,
            nombre_robot: nombre_listarobot,
            id_area: id_area,
            nombre_area: nombre_area,
            id_robot:message.id_robot,
            disponibilidad:message.disponibilidad,
            estado_robot:message.estado_robot,
            id_tribunal:trib,
            nombre_tribunal:'asdasdasd'
          })
          
        );
        setRobots([...robots, {
          id_listarobot: id_listarobot,
          nombre_robot: nombre_listarobot,
          id_area: id_area,
          nombre_area: nombre_area,
          id_robot:message.id_robot,
          disponibilidad:message.disponibilidad,
          estado_robot:message.estado_robot,
          id_tribunal:trib,
          nombre_tribunal:'asdasdasd'
        }])
        MySwal.fire(
          "¡Bien!",
          `Se ha agregado el robot `,
          "success"
        );
      } catch (error) {
        MySwal.fire("¡Algo ha salido mal!", error.response.data.message, "error");
      }
    };
  };

  export const startSetDisponibilidad = (id_robot, disponibilidad) => {
    return async (dispatch) => {
      const f = new FormData();
      f.append("id_robot", id_robot);
      f.append("disponibilidad", disponibilidad)
      const token = window.localStorage.getItem("rpa-jwt");
      // console.log(id_robot)
      try {
        const {data:{message}} = await rpaApi.post(`/setDisponibilidad/`, f, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(updateDisponibilidadRobot({id_robot, disponibilidad}));
      } catch (error) {
        console.log(error);
      }
    };
  };

  export const startDeleteRobot = (id_robot, nombre_robot, nombre_tribunal, robots, setRobots) => {
    return async (dispatch) => {
      const f = new FormData();
      f.append("id_robot", id_robot);
      const token = window.localStorage.getItem("rpa-jwt");
      
      try {
        const { status } = await rpaApi.post(`/deleteRobot/`, f, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        if (status === 200) {
          dispatch(deleteRobot(id_robot));
          MySwal.fire(
            "¡Eliminado!",
            `${nombre_robot} ha sido eliminado con éxito del ${nombre_tribunal}.`,
            "success"
          );
          // console.log(robots)
          const nuevadata = robots.filter((robot) => robot.id_robot !== id_robot)
          setRobots(nuevadata)
        }
      } catch (error) {
        console.log(error)
        MySwal.fire(
          "¡Algo ha salido mal!",
          `${nombre_robot} no ha podido ser eliminado.`,
          "error"
        );
      }
    };
  };