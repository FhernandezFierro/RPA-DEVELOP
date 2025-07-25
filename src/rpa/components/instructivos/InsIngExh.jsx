// import { onAuthStateChanged } from "firebase/auth";

import { Box, Grid, Typography } from "@mui/material";

export const InsIngExh = (state, toggleDrawer) => {
  const instructivoIngExh = (anchor) => (
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
            El ingreso de exhortos diario se obtiene directamente desde la
            plataforma de tramitación SITCI, cabe destacar que solo se muestran
            aqueyos no relacionados, por lo que si un funcionario se adelanta a
            la ejecución del robot, este dentro de su ejecución no contemplaría
            completar aquel ingreso de exhorto ya relacionado. Si la tabla se
            muestra vacía, esto significa que ya no quedan en bandeja de
            funcionarios más ingresos de exhorto para tramitar. El listado de
            Jueces también se obtiene directamente desde la plataforma, por lo
            que si no aparece disponible para firma el Juez deseado, por favor
            revisar que esté habilitado en la plataforma SITCI del Tribunal
            correspondiente. Paso a paso el robot realizará el siguiente
            proceso:
          </Typography>
          <ul>
            <li>
              <Typography variant="caption" color="primary">
                Iniciará sesión con las credenciales ingresadas.
              </Typography>
            </li>
            <li>
              <Typography variant="caption" color="primary">
                Para corroborar la existencia de ingresos de exhorto pendientes,
                buscará en la bandeja de funcionarios filtrando por todos para
                extraer finalmente los RIT de cada ingreso de exhorto.
              </Typography>
            </li>
            <li>
              <Typography variant="caption" color="primary">
                Por cada RIT, ingresará desde el apartado Tramitar el RIT
                correspondiente y directamente iniciará una resolución.
              </Typography>
            </li>
            <li>
              <Typography variant="caption" color="primary">
                Agregará la nomenclatura <b>Cúmplase</b>, seleccionará el Juez
                para firma y grabará el trámite.
              </Typography>
            </li>
            <li>
              <Typography variant="caption" color="primary">
                Finalmente, ingresará texto con la resolución entregada en el
                formulario y cerrará el documento para grabar y enviarlo a
                despach
              </Typography>
            </li>
          </ul>
        </Grid>
        <Grid item m={1} ml={3} m3={3}>
          <Typography variant="h4" color="primary" mb={1}>
            Instrucciones de ejecución.
          </Typography>

          <Typography variant="caption" color="primary">
            Este robot trabaja sobre la plataforma SITCI, en la cuál ejecutará
            todos los Ingresos de Exhorto que encuentre en la bandeja de
            funcionarios. Para asegurar una correcta ejecución es necesario:
          </Typography>
          <ul>
            <li>
              <Typography variant="caption" color="primary">
                Revisar las credenciales de acceso a la plataforma SITCI:
              </Typography>
              <ul>
                <li>
                  <Typography variant="caption" color="primary">
                    <a href="http://www.civil.pjud/">http://www.civil.pjud/</a>
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
    instructivoIngExh,
  };
};
