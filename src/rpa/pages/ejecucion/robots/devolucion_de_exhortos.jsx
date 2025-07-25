import {
  Avatar,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormHelperText,
  IconButton,
  Tooltip,
  Box,
  SwipeableDrawer,
} from "@mui/material";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  setNavbarText,
  startExeDevolucionDeExhortos,
} from "../../../../store/app";
import { useEffect, useState } from "react";
import { useForm } from "../../../../hooks/useForm2";
import { useParams } from "react-router-dom";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import "../../../../styles/robotHelp.css";
import { InsDevExh } from "../../../components/instructivos";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const devolucion_de_exhortos = () => {
  const MySwal = withReactContent(Swal);
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const {instructivoDevExh} = InsDevExh(state, toggleDrawer)

  const dispatch = useDispatch();
  const { id_robot } = useParams();
  const { jueces, enEjecucion } = useSelector((state) => state.app);

  const [{ nombre_robot, id_listarobot }] = useSelector((state) =>
    state.rpa.robotsTribunal.filter((robot) => robot.id_robot == id_robot)
  );
  const { id_tribunal, ip } = useSelector((state) => state.auth.tribunal);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [disableForm, setDisableForm] = useState(false);

  const [archivo, setArchivo] = useState(null);
  const [nombreArchivo, setNombreArchivo] = useState("");
  const [archivoValid, setArchivoValid] = useState(false);
  const [archivoValidText, setArchivoValidText] = useState(
    "El archivo debe ser formato Excel (.xls o .xlsx)"
  );

  const subirArchivo = (e) => {
    setArchivo(e.target.files[0]);
    if (
      e.target.value.split(".").pop() === "xls" ||
      (e.target.value.split(".").pop() === "xlsx" &&
        e.target.value.length !== 0)
    ) {
      setNombreArchivo(e.target.value);
      setArchivoValid(false);
      setArchivoValidText("");
    } else {
      setArchivoValid(true);
      setArchivoValidText("El archivo debe ser formato Excel (.xls o .xlsx)");
      setNombreArchivo("");
      setArchivo(null);
    }
  };

  const formData = {
    email: "",
    user_sitci: "",
    pass_sitci: "",
    juez: "",
    devoluciones: "",
  };

  const formValidations = {
    email: [[(value) => value.includes("@"), "El correo debe tener una @."]],
    user_sitci: [
      [
        (value) => value.length >= 3,
        "Usuario Sitci debe tener más de 3 letras.",
      ],
    ],
    pass_sitci: [
      [
        (value) => value.length >= 3,
        "Contraseña Sitci debe tener más de 3 letras.",
      ],
    ],
    juez: [
      [(value) => value.length >= 3, "No se ha seleccionado ningún juez."],
    ],
  };

  const {
    email,
    emailValid,
    user_sitci,
    user_sitciValid,
    pass_sitci,
    pass_sitciValid,
    juez,
    juezValid,
    isFormValid,
    onInputChange,
    formState,
  } = useForm(formData, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid || !archivoValid || archivo === null) {
      setArchivoValid(true);
      return;
    }
    if (enEjecucion.ejecutando) {
      MySwal.fire(
        "¡Error!",
        `Actualmente se está ejecutando otro proceso, espera a que este termine para intentarlo nuevamente. En la parte superior de la página puedes comprobar que proceso está siendo ejecutado.`,
        "warning"
      );
      return;
    }
    setDisableForm(true);
    formState.id_robot = id_robot;
    formState.nombre_robot = nombre_robot;
    formState.ip = ip;
    formState.id_tribunal = id_tribunal;
    formState.archivo = archivo;
    formState.id_listarobot = id_listarobot;
    dispatch(startExeDevolucionDeExhortos({ ...formState }));
  };

  useEffect(() => {
    dispatch(setNavbarText("Devolución de Exhortos"));
  }, []);

  return (
    <Grid container spacing={0} direction="row">
      <Grid item className="animate__animated animate__fadeIn">
        <Grid container spacing={0} justifyContent="right">
          <Grid item>
            <IconButton
              onClick={toggleDrawer("right", true)}
              aria-label="Ayuda"
              size="large"
              sx={{
                color: "primary.main",
                position: "fixed",
                right: 50,
                outline: "0px",
              }}
              style={{ outline: 0 }}
            >
              <Tooltip title="Instrucciones" arrow>
                <HelpRoundedIcon sx={{ fontSize: 30 }} />
              </Tooltip>
            </IconButton>
            <SwipeableDrawer
              anchor={"right"}
              open={state["right"]}
              onClose={toggleDrawer("right", false)}
              onOpen={toggleDrawer("right", true)}
              className="drawerhelp"
            >
              {instructivoDevExh("right")}
            </SwipeableDrawer>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={1}
        direction="row"
        justifyContent="center"
        alignItems="center"
        alignContent="center"
        wrap="wrap"
      >
        <Grid item lg={6}>
          <Grid
            container
            spacing={3}
            direction="row"
            justifyContent="center"
            alignItems="center"
            className="animate__animated animate__fadeIn"
          >
            <Grid item>
              <Avatar
                sizes="normal"
                sx={{ width: 56, height: 56, bgcolor: "#4a6d88" }}
              >
                <SmartToyOutlinedIcon />
              </Avatar>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={1}
            direction="column"
            justifyContent="center"
            alignItems="center"
            className="animate__animated animate__fadeIn"
          >
            <Grid item mt={1}>
              <Typography variant="h5" color="primary">
                {`Configurar Robot`}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            className="animate__animated animate__fadeIn"
          >
            <Grid
              item
              xs={3}
              sx={{ padding: 0, borderRadius: 3, width: { sm: 450 } }}
            >
              <form onSubmit={onSubmit} encType="multipart/form-data">
                <Grid container spacing={0}>
                  <Grid item xs={12} sx={{ marginTop: 2 }}>
                    <TextField
                      label="Email"
                      type="email"
                      placeholder="Email"
                      fullWidth
                      name="email"
                      variant="outlined"
                      value={email}
                      onChange={onInputChange}
                      error={!!emailValid && formSubmitted}
                      helperText={emailValid}
                      disabled={disableForm}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ marginTop: 2 }}>
                    <TextField
                      label="Usuario Sitci"
                      type="text"
                      placeholder="Usuario Sitci"
                      fullWidth
                      name="user_sitci"
                      variant="outlined"
                      value={user_sitci}
                      onChange={onInputChange}
                      error={!!user_sitciValid && formSubmitted}
                      helperText={user_sitciValid}
                      disabled={disableForm}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ marginTop: 2 }}>
                    <TextField
                      label="Contraseña Sitci"
                      type="password"
                      placeholder="Contraseña Sitci"
                      fullWidth
                      name="pass_sitci"
                      variant="outlined"
                      value={pass_sitci}
                      onChange={onInputChange}
                      error={!!pass_sitciValid && formSubmitted}
                      helperText={pass_sitciValid}
                      disabled={disableForm}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ marginTop: 2 }}>
                    <TextField
                      type="file"
                      fullWidth
                      name="devoluciones"
                      variant="outlined"
                      value={nombreArchivo}
                      onChange={(e) => subirArchivo(e)}
                      error={!!archivoValid && formSubmitted}
                      disabled={disableForm}
                    />
                    <FormHelperText error={archivoValid} sx={{ ml: 2 }}>
                      {archivoValidText}
                    </FormHelperText>
                  </Grid>

                  <Grid item xs={12} sx={{ marginTop: 2 }}>
                    <FormControl
                      fullWidth
                      error={!!juezValid && formSubmitted}
                      disabled={disableForm}
                    >
                      <InputLabel id="tipo-usuario-label">
                        Firma Juez
                      </InputLabel>
                      <Select
                        labelId="juez-label"
                        id="juez-select"
                        name="juez"
                        value={juez}
                        label="Firma Juez"
                        onChange={onInputChange}
                        defaultValue={""}
                        error={true}
                      >
                        {jueces?.map((juez) => (
                          <MenuItem
                            key={juez.apellido_paterno
                              .trim()
                              .toLowerCase()
                              .replace(/\w\S*/g, (w) =>
                                w.replace(/^\w/, (c) => c.toUpperCase())
                              )}
                            value={
                              juez.apellido_paterno
                                .trim()
                                .toLowerCase()
                                .replace(/\w\S*/g, (w) =>
                                  w.replace(/^\w/, (c) => c.toUpperCase())
                                ) +
                              " " +
                              juez.apellido_materno
                                .trim()
                                .toLowerCase()
                                .replace(/\w\S*/g, (w) =>
                                  w.replace(/^\w/, (c) => c.toUpperCase())
                                ) +
                              ", " +
                              juez.primer_nombre
                                .trim()
                                .toLowerCase()
                                .replace(/\w\S*/g, (w) =>
                                  w.replace(/^\w/, (c) => c.toUpperCase())
                                ) +
                              " " +
                              juez.segundo_nombre
                                .trim()
                                .toLowerCase()
                                .replace(/\w\S*/g, (w) =>
                                  w.replace(/^\w/, (c) => c.toUpperCase())
                                )
                            }
                          >
                            {juez.apellido_paterno
                              .trim()
                              .toLowerCase()
                              .replace(/\w\S*/g, (w) =>
                                w.replace(/^\w/, (c) => c.toUpperCase())
                              ) +
                              " " +
                              juez.apellido_materno
                                .trim()
                                .toLowerCase()
                                .replace(/\w\S*/g, (w) =>
                                  w.replace(/^\w/, (c) => c.toUpperCase())
                                ) +
                              ", " +
                              juez.primer_nombre
                                .trim()
                                .toLowerCase()
                                .replace(/\w\S*/g, (w) =>
                                  w.replace(/^\w/, (c) => c.toUpperCase())
                                ) +
                              " " +
                              juez.segundo_nombre
                                .trim()
                                .toLowerCase()
                                .replace(/\w\S*/g, (w) =>
                                  w.replace(/^\w/, (c) => c.toUpperCase())
                                )}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>{juezValid}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sx={{ marginTop: 2 }}>
                    <Grid
                      container
                      spacing={0}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item>
                        <Button
                          variant="contained"
                          type="submit"
                          style={{ outline: "none" }}
                          disabled={disableForm}
                        >
                          Ejecutar
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default devolucion_de_exhortos;