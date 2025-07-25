import notFoundImg from "../../../../assets/error-404.png";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import "animate.css";
const resumen_mensual = () => {
  return (
    <>
      <Grid
        container
        spacing={1}
        direction="column"
        justifyContent="center"
        alignItems="center"
        alignContent="center"
        sx={{ height: "80vh" }}
        className="animate__animated animate__fadeIn"
      >
        <Grid item mb={5} className="animate__animated animate__pulse">
            <img
              src={notFoundImg}
              alt="Robot no encontrado"
              style={{ maxWidth: "100%", width: "400px" }}
            />
          
        </Grid>
        <Grid item >
          <Typography variant="h4" color="initial">
            Robot no disponible por el momento
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default resumen_mensual;