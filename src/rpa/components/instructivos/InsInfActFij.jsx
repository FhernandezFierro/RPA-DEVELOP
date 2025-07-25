// import { onAuthStateChanged } from "firebase/auth";

import { Box, Grid, Typography } from "@mui/material";

export const InsInfActFij = (state, toggleDrawer) => {
  const instructivoInfActFij = (anchor) => (
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
            El robot ejecutará de manera secuencial los siguientes pasos. Su
            resultado será entregado por correo electrónico al mail señalado:
          </Typography>
          <ul>
            <li>
              <Typography variant="caption" color="primary">
                Iniciará sesión con las credenciales ingresadas.
              </Typography>
            </li>
            <li>
              <Typography variant="caption" color="primary">
                Ingresará el centro financiero, fuente de financiamiento, moneda
                y el último día correspondiente al mes actual.
              </Typography>
            </li>
            <li>
              <Typography variant="caption" color="primary">
                Finalmente descargará secuencialmente los siguientes informes:
              </Typography>
              <ul>
                <li>
                  <Typography variant="caption" color="primary">
                    Alta de Bienes.
                  </Typography>
                </li>
                <li>
                  <Typography variant="caption" color="primary">
                    Baja de Bienes.
                  </Typography>
                </li>
                <li>
                  <Typography variant="caption" color="primary">
                    Bienes Valorizados.
                  </Typography>
                </li>
                <li>
                  <Typography variant="caption" color="primary">
                    Consulta de Bienes.
                  </Typography>
                </li>
                <li>
                  <Typography variant="caption" color="primary">
                    Ajustes de cierre vida útil.
                  </Typography>
                </li>
                <li>
                  <Typography variant="caption" color="primary">
                    Inventario de bienes valorizados.
                  </Typography>
                </li>
                <li>
                  <Typography variant="caption" color="primary">
                    Traslado de bienes enviados.
                  </Typography>
                </li>
                <li>
                  <Typography variant="caption" color="primary">
                    Traslado de bienes recibidos
                  </Typography>
                </li>
                <li>
                  <Typography variant="caption" color="primary">
                    Administración de resoluciones.
                  </Typography>
                </li>
              </ul>
            </li>
          </ul>
        </Grid>
        <Grid item m={1} ml={3} m3={3}>
          <Typography variant="h4" color="primary" mb={1}>
            Instrucciones de ejecución.
          </Typography>

          <Typography variant="caption" color="primary">
            Este robot trabaja sobre la plataforma CGU+Plus, en la cuál
            descargará y organizará el informe de activos fijos que es necesario
            realizar a cada fin de més para el cierre contable. Para su
            ejecución es importante:
          </Typography>
          <ul>
            <li>
              <Typography variant="caption" color="primary">
                Revisar las credenciales de acceso a la plataforma CGU+:
              </Typography>
              <ul>
                <li>
                  <Typography variant="caption" color="primary">
                    <a href="http://www.cgu.pjud/">http://www.cgu.pjud/</a>
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
                Completar formulario e iniciar el robot.
              </Typography>
            </li>
          </ul>
        </Grid>
      </Grid>
    </Box>
  );

  return {
    instructivoInfActFij,
  };
};