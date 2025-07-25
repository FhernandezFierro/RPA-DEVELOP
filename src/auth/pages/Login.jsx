import { React, useState } from "react";
import "../../styles/login2.css";
import { validateRut } from "@fdograph/rut-utilities";
import {
  Button,
  Grid,
  Typography,
  Box,
  InputLabel,
  Input,
  IconButton,
  InputAdornment,
  FormControl,
  Alert
} from "@mui/material";
import logoPjud from "../../assets/logoPJUD.png";
import Avatar from "@mui/material/Avatar";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "animate.css";
import { startLogin } from "../../store/auth";
import { useDispatch, useSelector } from "react-redux";

export const Login = () => {
  const { errorMessage } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [rut, setRut] = useState("");
  const [contrasena, setContrasena] = useState("");

  const [errorRut, setErrorRut] = useState(false);
  const [errorContrasena, setErrorContrasena] = useState(false);

  const [errorRutText, setErrorRutText] = useState("");
  const [errorContrasenaText, setErrorContrasenaText] = useState("");

  const seteaRut = (e) => {
    setRut(e.target.value);
  };

  const seteaContrasena = (e) => {
    setContrasena(e.target.value);
  };

  const handleValidations = () => {
    var isError = false;
    if (rut.trim() === "") {
      isError = true;
      setErrorRutText("Campo rut no puede estar vacío.");
      setErrorRut(true);
    } else {
      if (validateRut(rut.trim()) === false) {
        isError = true;
        setErrorRutText("El campo rut es incorrecto.");
        setErrorRut(true);
      } else {
        setErrorRutText("");
        setErrorRut(false);
      }
    }
    if (contrasena.trim() === "") {
      isError = true;
      setErrorContrasenaText("Campo contraseña no puede estar vacío.");
      setErrorContrasena(true);
    } else {
      setErrorContrasenaText("");
      setErrorContrasena(false);
    }
    if (isError === false) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (handleValidations()) {
      dispatch(startLogin({ rut, contrasena }));
    }
  };

  return (
    <>
      <Grid container sx={{ textAlign: "center" }}>
        <Grid item lg={4} xl={4} md={4} sm={4} xs={4} style={{backgroundColor:'#d5d9e0'}}>
          <Box className="msg-texto">
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              className="animate__animated animate__slideInLeft"
            >
              <Grid item>
                <img src={logoPjud} alt="LogoPJUD" style={{ width: "60%" }} />
              </Grid>
              <Grid item style={{ margin: "50px" }}>
                <Typography variant="h5" className="titulo-msg-texto">
                  RPA PJUD
                </Typography>
              </Grid>
              <Grid item style={{ margin: "20px" }}>
                <Typography variant="body2" className="texto-msg-texto">
                  RPA PJUD es una plataforma que robotiza tareas repetitivas
                  de funcionarios en el Poder Judicial.
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item lg={8} xl={8} md={8} sm={8} xs={8}>
          <Box className="login-form">
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              className="animate__animated animate__slideInRight"
            >
              <Grid
                item
                className={
                  errorContrasena
                    ? "avatar-formulario animate__animated animate__swing"
                    : errorRut
                    ? "avatar-formulario animate__animated animate__swing"
                    : ""
                }
                mb={2}
              >
                <Avatar
                  sx={{ width: 56, height: 56, bgcolor: "#4a6d88" }}
                  variant="rounded"
                >
                  <LockOpenIcon />
                </Avatar>
              </Grid>

              <Grid item className="grid-titulo-formulario">
                <Typography variant="h3" className="titulo-login-form">
                  Iniciar Sesión
                </Typography>
              </Grid>

              <Grid item className="grid-titulo-formulario">
                <Typography variant="body1" className="body1-login-form">
                  Ingresa tus credenciales para entrar a la plataforma.
                </Typography>
              </Grid>

              <Grid item className="grid-rut">
                <FormControl
                  fullWidth
                  sx={{ m: 1, width: "100%" }}
                  variant="standard"
                >
                  <InputLabel htmlFor="standard-adornment-password">
                    Rut
                  </InputLabel>
                  <Input
                    id="rut"
                    label="Rut"
                    variant="standard"
                    size="medium"
                    fullWidth
                    onChange={(e) => seteaRut(e)}
                    error={errorRut}
                  />
                </FormControl>
                <Typography variant="caption" color="error">
                  {errorRutText}
                </Typography>
              </Grid>

              <Grid item className="grid-contraseña">
                <FormControl
                  fullWidth
                  sx={{ m: 1, width: "100%" }}
                  variant="standard"
                >
                  <InputLabel htmlFor="standard-adornment-password">
                    Contraseña
                  </InputLabel>
                  <Input
                    id="Contraseña"
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => seteaContrasena(e)}
                    error={errorContrasena}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          style={{outline:'none'}}
                        >
                          {showPassword ? (
                            <VisibilityOff style={{ color: "#4a6d88" }} />
                          ) : (
                            <Visibility style={{ color: "#4a6d88" }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                
                <Typography variant="caption" color="error">
                  {errorContrasenaText}
                </Typography>
                <Grid
                  container
                  display={!!errorMessage ? "" : "none"}
                  sx={{ m: 1 }}
                  justifyContent='center'
                  alignContent='center'
                  alignItems='center'
                >
                  <Grid item xs={12} sx={{width:'100%'}}>
                    <Alert severity="error">{errorMessage}</Alert>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item className="btn-envia-formulario" mt={4}>
                <Button variant="contained" onClick={handleSubmit} style={{outline:'none'}}>
                  Ingresar
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
