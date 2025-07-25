import { Box, Grid, Typography } from "@mui/material";

export const InsTranscripcion = (state, toggleDrawer) => {
  const instructivoTranscripcion = (anchor) => (
    <Box
      sx={{ width: "500px", borderTopLeftRadius: "30px" }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      className="help"
    >
      <Grid
        container
        spacing={0}
        direction="row"
        justifyContent="center"
        alignItems="center"
        alignContent="center"
        // wrap="wrap"
        mt={3}
      >
        <Grid item m={1} ml={3} m3={3}>
          <Typography variant="h4" color="primary" mb={1}>
            Descripción del proceso.
          </Typography>

          <Typography variant="caption" color="primary">
            Para poder hacer uso de la herramienta de transcripción de audio a
            texto, es necesario tener en cuenta 4 aspectos importantes:
          </Typography>
          <ul>
            <li>
              <Typography variant="caption" color="primary">
                El archivo transcrito será devuelto vía correo electrónico según
                se haya indicado en el formulario a la izquierda. Por favor
                revisar la dirección ingresada ya que al término del
                procesamiento podría no ser entregado.
              </Typography>
            </li>
            <li>
              <Typography variant="caption" color="primary">
                Dependiendo del tamaño del archivo, el proceso podría tomar más
                tiempo del esperado, por favor no cerrar ni cambiar de página
                para no interrumpir el proceso de subida al servidor. Una alerta
                al final del proceso avisará que se ha completado la subida.
                Luego solo queda esperar a que llegue el resultado al correo
                electrónico indicado.
              </Typography>
            </li>
            <li>
              <Typography variant="caption" color="primary">
                Finalmente, el resultado final dependerá directamente de la
                calidad del audio que se pretenda transcribir, esto contempla
                que los hablantes mantengan un buen volumen de voz y modulación.
              </Typography>
            </li>
            <li>
              <Typography variant="caption" color="primary">
                El resultado final puede tener errores, por lo que siempre será
                necesario que el usuario revise lo transcrito para realizar las
                correcciones pertinentes.
              </Typography>
            </li>
          </ul>
        </Grid>
      </Grid>
    </Box>
  );

  return {
    instructivoTranscripcion,
  };
};
