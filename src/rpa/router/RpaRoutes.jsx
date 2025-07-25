import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import {
  Home,
  Areas,
  Usuarios,
  RobotsTribunal,
  RobotsAdmin,
  RobotsXarea,
  // archivos_familia,
  // ingreso_de_exhortos,
  // gestion_de_sii,
  // resumen_mensual,
  // devolucion_de_exhortos,
  // informe_activos_fijos,
} from "../pages";
import { RpaLayout } from "../layout/RpaLayout";
import { useDispatch, useSelector } from "react-redux";
import { startGetAreas } from "../../store/rpa/thunksAreas";
import { AddUsuario, AddUsuarioSudo, UpdateUsuario } from "../pages/usuarios";
import { startGetUsuarios } from "../../store/rpa/thunksUsuarios";
import { Tribunales } from "../pages/tribunales/Tribunales";
import {
  startGetListarobots,
  startGetTribunales,
  startSetRobots,
} from "../../store/rpa";
import {
  AddTribunal,
  UpdateTribunal,
  UpdateTribunalAdmin,
} from "../pages/tribunales";
import { Listarobots } from "../pages/listarobots";
import { UsuariosSudo } from "../pages/usuarios/UsuariosSudo";
import {
  startCheckConnection,
  startGetHistorial,
} from "../../store/rpa/thunksEjecuciones";
import { Plataformas } from "../pages/plataformas";
import {
  startCheckEjecucion,
  startGetExhortosCivil,
  startGetJueces,
} from "../../store/app/thunksApp";
import { Transcripcion } from "../pages/transcripciones";

export const RpaRoutes = () => {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);
  const { id_tribunal } = useSelector((state) => state.auth.tribunal);
  const { areas } = useSelector((state) => state.rpa);
  const robots = useSelector((state) =>
    state.rpa.robotsTribunal.filter((robot) => robot.id_tribunal == id_tribunal)
  );
  const [robotComponents, setRobotComponents] = useState([]);

  const checkConnectInicial = () => {
    dispatch(startCheckConnection(id_tribunal));
  };

  const iniciaCheckEjecucion = () => {
    dispatch(startCheckEjecucion(id_tribunal));
  };

  const iniciaDataAreas = () => {
    dispatch(startGetAreas());
  };

  const iniciaDataUsuarios = () => {
    dispatch(startGetUsuarios(id_tribunal));
  };

  const iniciaDataTribunales = () => {
    dispatch(startGetTribunales());
  };

  const iniciaDataListarobots = () => {
    dispatch(startGetListarobots());
  };

  const iniciaDataRobots = () => {
    dispatch(startSetRobots(id_tribunal));
  };

  const iniciaGetJueces = () => {
    dispatch(startGetJueces(id_tribunal));
  };

  const iniciaGetExhortosCivil = () => {
    dispatch(startGetExhortosCivil(id_tribunal));
  };

  const iniciaGetHistorial = () => {
    dispatch(startGetHistorial(id_tribunal));
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     iniciaCheckEjecucion();
  //   }, 5000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  useEffect(() => {
    checkConnectInicial();
    iniciaDataAreas();
    iniciaDataUsuarios();
    iniciaDataTribunales();
    iniciaDataListarobots();
    iniciaDataRobots();
    iniciaGetJueces();
    iniciaGetExhortosCivil();
    iniciaGetHistorial();
  }, [robots.length]);

  

  useEffect(() => {
    
    const loadRobotComponents = async () => {
      const components = await Promise.all(
        robots.map(async (robot) => {
          const component = await loadRobotComponent(robot.nombre_robot);
          return {
            robotId: robot.id_robot,
            component: component,
          };
        })
      );
      setRobotComponents(components);
    };

    loadRobotComponents();
  }, [robots.length]);

  const loadRobotComponent = async (robotName) => {
    try {
      // Utiliza la importación dinámica para cargar el módulo
      const robotModule = await import(
        `../pages/ejecucion/robots/${robotName
          .toLowerCase()
          .replace(/\s/g, "_")}.jsx`
      );
      // console.log(robotModule.default)
      return robotModule.default;
    } catch (error) {
      // Maneja el caso si el componente no se encuentra
      // Aquí puedes mostrar una página de error o alguna lógica alternativa
      console.error("Error al cargar el componente", error);
      return null;
    }
  };

  return (
    <RpaLayout>
      <Routes>
        {/*RUTAS PARA SUDO*/}
        {role === "sudo" && (
          <>
            <Route path="/usuariosSudo" element={<UsuariosSudo />} />
            <Route path="/areas" element={<Areas />} />
            <Route path="/plataformas" element={<Plataformas />} />
            <Route
              path="/usuarios/addusuarioSudo/:id_trib"
              element={<AddUsuarioSudo />}
            />{" "}
            <Route path="/tribunales" element={<Tribunales />} />
            <Route
              path="/tribunales/addtribunal"
              element={<AddTribunal />}
            />{" "}
            <Route
              path="/tribunales/updatetribunal/:idUpdateTribunal"
              element={<UpdateTribunal />}
            />{" "}
            <Route path="/listarobots" element={<Listarobots />} />
            <Route path="/asociarobot" element={<RobotsTribunal />} />
          </>
        )}
        {/*RUTAS PARA ADMIN Y SUDO*/}
        {role !== "user" && (
          <>
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/usuarios/addusuario" element={<AddUsuario />} />{" "}
            <Route
              path="/usuarios/updateusuario/:idUpdateUsuario"
              element={<UpdateUsuario />}
            />{" "}
            <Route
              path="/tribunales/updatetribunalAdmin"
              element={<UpdateTribunalAdmin />}
            />{" "}
            <Route path="/robots" element={<RobotsAdmin />} />{" "}
          </>
        )}

        {/*RUTAS PARA ADMIN, SUDO Y USER*/}

        <Route path="/transcripción" element={<Transcripcion />} />

        {areas.map((area) => (
          <Route
            key={area.id_area}
            path={`/${area.nombre_area.toLowerCase()}/:id_area`}
            element={<RobotsXarea />}
          />
        ))}

        {robotComponents.map((rc) => (
          <Route
            key={rc.robotId}
            path={`/${robots
              .find((robot) => robot.id_robot === rc.robotId)
              .nombre_robot.toLowerCase()
              .replace(/\s/g, "_")}/:id_robot`}
            element={<rc.component />}
          />
        ))}

        <Route path="/" element={<Home />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </RpaLayout>
  );
};
