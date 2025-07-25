// import { onAuthStateChanged } from "firebase/auth";

import { Box, Grid, Typography } from "@mui/material";

export const InsGestSii = (state, toggleDrawer) => {
  const instructivoGestSii = (anchor) => (
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
            El robot se encarga de la verificación de los documentos
            electrónicos y su cesión a un tercero bajo la modalidad de Factoring
            para así asegurar el pago al tenedor del documento. El proceso
            comienza inciando sesión en la plataforma del servicio de impuestos
            internos y revisando el excel entregado por el usuario. Por cada
            fila irá iterando y realizando los siguientes pasos:
          </Typography>
          <ul>
            <li>
              <Typography variant="caption" color="primary">
                Solo hará el proceso si la fila contiene el valor "FAE" o
                "FEEX".
              </Typography>
            </li>
            <li>
              <Typography variant="caption" color="primary">
                Consulta validez del documento.
              </Typography>
            </li>
            <li>
              <Typography variant="caption" color="primary">
                Consulta documentos autorizados.
              </Typography>
            </li>
            <li>
              <Typography variant="caption" color="primary">
                Consulta al registro público electrónico de transferencia de
                créditos (RPETC)
              </Typography>
            </li>
            <li>
              <Typography variant="caption" color="primary">
                Finalmente por cada fila creará un documento en pdf que tendrá
                pantallazos de las consultas realizadas y se enviará por correo
                electrónico en formato .zip .
              </Typography>
            </li>
          </ul>
        </Grid>
        <Grid item m={1} ml={3} m3={3}>
          <Typography variant="h4" color="primary" mb={1}>
            Instrucciones de ejecución.
          </Typography>

          <Typography variant="caption" color="primary">
            Este robot funciona trabajando directamente en la plataforma del
            servicio de impuestos internos ingresando con el usuario y
            contraseña de la clave única. Para asegurar su funcionamiento es
            necesario seguir los siguientes pasos:
          </Typography>
          <ul>
            <li>
              <Typography variant="caption" color="primary">
                Revisar las credenciales de acceso a la plataforma del servicio
                de impuestos internos con su clave única:
              </Typography>
              <ul>
                <li>
                  <Typography variant="caption" color="primary">
                    <a href="https://zeusr.sii.cl/">https://zeusr.sii.cl/</a>
                  </Typography>
                </li>
              </ul>
            </li>
            <li>
              <Typography variant="caption" color="primary">
                Realizar la conexión vía escritorio remoto con el equipo que se
                configuró para la ejecución de los procesos de robotización.
              </Typography>
            </li>
            <li>
              <Typography variant="caption" color="primary">
                Probar la conexión desde la página web hacia el escritorio
                remoto.
              </Typography>
            </li>
            <li>
              <Typography variant="caption" color="primary">
                Comprobar que filas de archivo excel corresponden con las
                señaladas en la plantilla.
              </Typography>
            </li>
            <li>
              <Typography variant="caption" color="primary">
                Completar el formulario e iniciar el robot.
              </Typography>
            </li>
          </ul>
        </Grid>
      </Grid>
    </Box>
  );

  return {
    instructivoGestSii,
  };
};
