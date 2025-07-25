import {
  Avatar,
  Button,
  Grid,
  TextField,
  Typography,
  IconButton,
  Tooltip,
  Box,
  SwipeableDrawer,
} from "@mui/material";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  setNavbarText,
  startExeInformeActivoFijo,
} from "../../../../store/app";
import { useEffect, useState } from "react";
import { useForm } from "../../../../hooks/useForm2";
import { useParams } from "react-router-dom";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import "../../../../styles/robotHelp.css";
import { InsInfActFij } from "../../../components/instructivos";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const informe_activos_fijos = () => {
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

  const {instructivoInfActFij} = InsInfActFij(state, toggleDrawer);

  const dispatch = useDispatch();
  const { id_robot } = useParams();
  const [{ nombre_robot, id_listarobot }] = useSelector((state) =>
    state.rpa.robotsTribunal.filter((robot) => robot.id_robot == id_robot)
  );
  const { id_tribunal, ip } = useSelector((state) => state.auth.tribunal);
  const { enEjecucion } = useSelector((state) => state.app);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [disableForm, setDisableForm] = useState(false);

  const formData = {
    email: "",
    cen_fin:"",
    user_cgu: "",
    pass_cgu: "",
  };

  const formValidations = {
    email: [[(value) => value.includes("@"), "El correo debe tener una @."]],
    cen_fin: [
      [(value) => value.length === 4, "Centro financiero debe tener un largo de 4 dígitos. Ej: 0123"],
    ],
    user_cgu: [
      [(value) => value.length >= 3, "Usuario CGU debe tener más de 3 letras."],
    ],
    pass_cgu: [
      [
        (value) => value.length >= 3,
        "Contraseña CGU debe tener más de 3 letras.",
      ],
    ],
  };

  const {
    email,
    emailValid,
    cen_fin,
    cen_finValid,
    user_cgu,
    user_cguValid,
    pass_cgu,
    pass_cguValid,
    isFormValid,
    onInputChange,
    formState,
  } = useForm(formData, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
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
    formState.id_listarobot = id_listarobot;
    dispatch(startExeInformeActivoFijo({ ...formState }));
  };

  useEffect(() => {
    dispatch(setNavbarText("Informe de Activos Fijos"));
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
              {instructivoInfActFij("right")}
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
                      label="Centro financiero"
                      type="text"
                      placeholder="Centro financiero"
                      fullWidth
                      name="cen_fin"
                      variant="outlined"
                      value={cen_fin}
                      onChange={onInputChange}
                      error={!!cen_finValid && formSubmitted}
                      helperText={cen_finValid}
                      disabled={disableForm}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ marginTop: 2 }}>
                    <TextField
                      label="Usuario CGU"
                      type="text"
                      placeholder="Usuario CGU"
                      fullWidth
                      name="user_cgu"
                      variant="outlined"
                      value={user_cgu}
                      onChange={onInputChange}
                      error={!!user_cguValid && formSubmitted}
                      helperText={user_cguValid}
                      disabled={disableForm}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ marginTop: 2 }}>
                    <TextField
                      label="Contraseña CGU"
                      type="password"
                      placeholder="Contraseña CGU"
                      fullWidth
                      name="pass_cgu"
                      variant="outlined"
                      value={pass_cgu}
                      onChange={onInputChange}
                      error={!!pass_cguValid && formSubmitted}
                      helperText={pass_cguValid}
                      disabled={disableForm}
                    />
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

export default informe_activos_fijos;