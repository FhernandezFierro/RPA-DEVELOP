import {
  TextField,
  Grid,
  Typography,
  Avatar,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Button,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "animate.css";
import { useCrudUpdateUsuarios } from "../../hooks";

export const UpdateUsuario = () => {
  const {
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
  } = useCrudUpdateUsuarios();
  return (
    <>
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
            <AccountCircleIcon />
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
        <Grid item>
          <Typography variant="h5" color="primary">
            {`Actualizar usuario`}
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
          {usuario[0] ? (
            <form onSubmit={onSubmit}>
              <Grid container spacing={0}>
                <Grid item xs={12} sx={{ marginTop: 2 }}>
                  <TextField
                    label="Nombre"
                    type="text"
                    placeholder="Nombre"
                    fullWidth
                    name="nombre"
                    variant="outlined"
                    value={nombre}
                    onChange={onInputChange}
                    error={!!nombreValid && formSubmitted}
                    helperText={nombreValid}
                  />
                </Grid>
                <Grid item xs={12} sx={{ marginTop: 2 }}>
                  <TextField
                    label="Apellido"
                    type="text"
                    placeholder="Apellido"
                    fullWidth
                    name="apellido"
                    variant="outlined"
                    value={apellido || ""}
                    onChange={onInputChange}
                    error={!!apellidoValid && formSubmitted}
                    helperText={apellidoValid}
                  />
                </Grid>
                <Grid item xs={12} sx={{ marginTop: 2 }}>
                  <TextField
                    label="Rut"
                    type="text"
                    placeholder="Ej: 12345678-9"
                    fullWidth
                    name="rut"
                    variant="outlined"
                    value={rut || ""}
                    onChange={onInputChange}
                    error={!!rutValid && formSubmitted}
                    helperText={rutValid}
                  />
                </Grid>
                <Grid item xs={12} sx={{ marginTop: 2 }}>
                  <TextField
                    label="Correo electrónico"
                    type="email"
                    placeholder="Correo electrónico"
                    fullWidth
                    name="correo"
                    variant="outlined"
                    value={correo || ""}
                    onChange={onInputChange}
                    error={!!correoValid && formSubmitted}
                    helperText={correoValid}
                  />
                </Grid>
                <Grid item xs={12} sx={{ marginTop: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel id="tipo-usuario-label">
                      Tipo usuario
                    </InputLabel>
                    <Select
                      labelId="tipo-usuario-label"
                      id="tipo-usuario-select"
                      name="tipo_usuario"
                      value={tipo_usuario || ""}
                      label="Tipo usuario"
                      onChange={onInputChange}
                    >
                      <MenuItem value={"user"}>Usuario</MenuItem>
                      <MenuItem value={"admin"}>Administrador</MenuItem>
                    </Select>
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
                      >
                        Actualizar
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          ) : (
            <Grid
              container
              spacing={0}
              justifyContent="center"
              alignContent="center"
              sx={{ height: "65vh" }}
            >
              <Grid item>
                <Typography variant="h6" color="error">
                  ¡Usuario no encontrado en el Tribunal!
                </Typography>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
};
