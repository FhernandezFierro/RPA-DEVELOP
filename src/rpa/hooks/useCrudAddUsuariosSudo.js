import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { startAddNewUsuario } from "../../store/rpa/thunksUsuarios";
import { validateRut } from "@fdograph/rut-utilities";
import { setNavbarText } from "../../store/app";
export const useCrudAddUsuariosSudo = () => {

  const { id_trib } = useParams();

  const navigate = useNavigate();

  const tribunal = useSelector((state) =>
    state.rpa.tribunales.filter((trib) => trib.id_tribunal == id_trib)
  );
  const nombre_tribunal = tribunal[0].nombre;
  const id_tribunal = tribunal[0].id_tribunal;
  const dispatch = useDispatch();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const formData = {
    nombre: "",
    apellido: "",
    rut: "",
    correo: "",
    tipo_usuario: "user",
    contrasena: "",
    repiteContrasena: "",
  };

  const formValidations = {
    nombre: [
      (value) => value.length >= 3,
      "El nombre debe tener más de 3 letras.",
    ],
    apellido: [
      (value) => value.length >= 3,
      "El apellido debe tener más de 3 letras.",
    ],
    rut: [(value) => validateRut(value), "Rut incorrecto"],
    correo: [(value) => value.includes("@"), "El correo debe tener una @."],
    contrasena: [
      (value) => value.length >= 3,
      "La contraseña debe tener más de 3 letras",
    ],
    repiteContrasena: [
      (value) => value === contrasena,
      "La contraseña no coincide.",
    ],
  };
  
  const {
    nombre,
    nombreValid,
    apellido,
    apellidoValid,
    rut,
    rutValid,
    correo,
    correoValid,
    tipo_usuario,
    contrasena,
    contrasenaValid,
    repiteContrasena,
    repiteContrasenaValid,
    isFormValid,
    onInputChange,
    formState,
  } = useForm(formData, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    formState.id_tribunal = id_tribunal;
    dispatch(startAddNewUsuario(formState));
    navigate(-1);
  };
  

  return {
    nombre_tribunal,
    onSubmit,
    formSubmitted,
    onInputChange,
    nombre,
    nombreValid,
    rut,
    rutValid,
    apellido,
    apellidoValid,
    correo,
    correoValid,
    contrasena,
    contrasenaValid,
    repiteContrasena,
    repiteContrasenaValid,
    tipo_usuario,
  };
};
