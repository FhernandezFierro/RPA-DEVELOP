import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  startAddNewArea,
  startDeleteArea,
  startUpdateArea,
} from "../../store/rpa/thunksAreas";
import { setNavbarText } from "../../store/app";
import { useEffect } from "react";
export const useCrudAreas = () => {

  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);
  const { areas } = useSelector((state) => state.rpa);
  

  const onNewArea = () => {
    MySwal.fire({
      title: "Ingresa nombre nueva área",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Agregar",
      showLoaderOnConfirm: true,
      inputValidator: (value) => {
        if (!value) return "Debes escribir un área.";
        if (value.length < 3)
          return "El nombre debe tener al menos 3 caracteres.";
        if (value.length > 30)
          return "El nombre debe ser menor a 30 caracteres";
        const isRepited = areas.map((row) => {
          if (row.nombre_area === value) return true; 
          return false;
        });
        if (isRepited.includes(true))
          return "Ya existe un área con ese nombre.";
      },
      preConfirm: (value) => {
        dispatch(startAddNewArea(value));
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  const onUpdateArea = ({ id_area, nombre_area }) => {
    MySwal.fire({
      title: `Actualizar el área ${nombre_area}`,
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      inputValue: nombre_area,
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Actualizar",
      showLoaderOnConfirm: true,
      inputValidator: (value) => {
        if (!value) return "Debes escribir un área.";
        if (value.length < 3)
          return "El nombre debe tener al menos 3 caracteres.";
        if (value.length > 30)
          return "El nombre debe ser menor a 30 caracteres";
        const isRepited = areas.map((row) => {
          return row.nombre_area === value;
        });
        if (isRepited.includes(true))
          return "Ya existe un área con ese nombre.";
      },
      preConfirm: (value) => {
        dispatch(startUpdateArea({ id_area, nombre_area, value }));
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  const onDeleteArea = ({ id_area, nombre_area }) => {
    MySwal.fire({
      title: `¿Seguro que deseas eliminar ${nombre_area}?`,
      text: `Se eliminará de manera permanente.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmo",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(startDeleteArea({ id_area, nombre_area }));
      }
    });
  };

  useEffect(() => {
    dispatch(setNavbarText('Administración de áreas'))
  }, []);

  return {
    dispatch,
    MySwal,
    areas,
    onNewArea,
    onUpdateArea,
    onDeleteArea,
  }

};
