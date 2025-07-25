import { useDispatch } from "react-redux";
import { setNavbarText } from "../../../store/app";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Divider,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import '../../../styles/plataformas.css'

export const Plataformas = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    dispatch(setNavbarText("Plataformas de tramitación"));
  }, []);
  return (
    <>
      <Grid container spacing={0} alignItems="center" justifyContent="center">
        <Grid item>
          {/* 
            SITCI
            SITFA
            SITMIX
            SITLA
            SITCO
            SIAGJ
            Gestión Penal
         */}
          <Card
            className="tarjeta animate__animated animate__pulse animate__faster"
            sx={{
              display: "flex",
              width: "300px",
              "&:hover": {
                boxShadow: "-1px 10px 10px 0px rgba(128,128,128,0.8)",
                // transform: '1.5px'
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "rgb(28, 37, 54)",
                width: "100%",
              }}
            >
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="div" variant="h5" color="#d5d9e0">
                  SITCI
                </Typography>
              </CardContent>
              <Divider variant="middle" sx={{ backgroundColor: "#d5d9e0" }} />
              <Grid
                container
                spacing={3}
                justifyContent="center"
                direction="row"
              >
                <Grid item>
                  <Typography
                    sx={{ mt: 1 }}
                    component="div"
                    variant="body2"
                    color="#d5d9e0"
                  >
                    {`Usuario y contraseña`}
                  </Typography>
                </Grid>

                <Grid item >
                  <TextField
                    className={'usuario-sitci'}
                    id="user-sitci"
                    label="Usuario sitci"
                  />
                </Grid>

                <Grid item>
                  <FormControl sx={{ m: 0, mb:2 }} variant="outlined">
                    <InputLabel color='background' htmlFor="outlined-adornment-password" className="#password-sitci-label">
                      Contraseña
                    </InputLabel>

                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
                </Grid>

                <Typography variant="caption" color="error">
                  {/* {errorRutText} */}
                </Typography>
              </Grid>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
