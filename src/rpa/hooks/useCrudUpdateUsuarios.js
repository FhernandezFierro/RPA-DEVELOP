import { validateRut } from "@fdograph/rut-utilities";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { startUpdateUsuario } from "../../store/rpa/thunksUsuarios";
import { setNavbarText } from "../../store/app";

export const useCrudUpdateUsuarios = () => {
  const navigate = useNavigate();
  const { idUpdateUsuario } = useParams();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const dispatch = useDispatch();

  const {
    id_usuario,
    tribunal: { id_tribunal, nombre_tribunal },
  } = useSelector((state) => state.auth);

  const usuario = useSelector((state) =>
    state.rpa.usuarios.filter((usr) => usr.id_usuario == idUpdateUsuario)
  );

  const formData = {
    nombre: "",
    apellido: "",
    rut: "",
    correo: "",
    tipo_usuario: "",
  };

  const formValidations = {
    nombre: [
      (value) => value?.length >= 3,
      "El nombre debe tener más de 3 letras.",
    ],
    apellido: [
      (value) => value?.length >= 3,
      "El apellido debe tener más de 3 letras.",
    ],
    rut: [(value) => validateRut(value), "Rut incorrecto"],
    correo: [(value) => value?.includes("@"), "El correo debe tener una @."],
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
    isFormValid,
    onInputChange,
    formState,
    setFormState,
  } = useForm(formData, formValidations);

  const handleonSettingUser = () => {
    setFormState({
      nombre: usuario[0].nombre,
      apellido: usuario[0].apellido,
      rut: usuario[0].rut,
      correo: usuario[0].correo,
      tipo_usuario: usuario[0].tipo_usuario,
    });
  };

  useEffect(() => {
    if (usuario[0]) handleonSettingUser();
  }, [usuario.length]);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    formState.id_usuario = parseInt(idUpdateUsuario);
    formState.id_tribunal = id_tribunal;
    formState.current_idUser = id_usuario;
    dispatch(startUpdateUsuario(formState));
    navigate(-1);
  };

  useEffect(() => {
    dispatch(
      setNavbarText(
        `Actualizar usuario ${usuario[0].nombre} ${usuario[0].apellido}`
      )
    );
  }, []);

  return {
    nombre_tribunal,
    usuario,
    onSubmit,
    nombre,
    onInputChange,
    nombreValid,
    formSubmitted,
    apellido,
    apellidoValid,
    rut,
    rutValid,
    correo,
    correoValid,
    tipo_usuario,
  };
};
