// import { onAuthStateChanged } from "firebase/auth";

import { Box, Grid, Typography } from "@mui/material";

export const InsDevExh = (state, toggleDrawer) => {
  const instructivoDevExh = (anchor) => (
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
            El robot, utilizando la planilla excel entregada en el formulario,
            recorrerá cada rit existente para intentar realizar el proceso de
            devolución de exhorto. Es importante saber que la planilla excel
            debe ser llenada por quién pretende ejecutar el proceso ya que
            mientras funcione, no se harán validaciones en la causa.
          </Typography>
          <ul>
            <li>
              <Typography variant="caption" color="primary">
                Ingresará con las credenciales entregadas a la plataforma SITCI.
              </Typography>
            </li>
            <li>
              <Typography variant="caption" color="primary">
                Ingresará primer rit de la planilla excel.
              </Typography>
            </li>
            <li>
              <Typography variant="caption" color="primary">
                Iniciará una nueva resolución.
              </Typography>
            </li>
            <li>
              <Typography variant="caption" color="primary">
                Se asignará el Juez indicado en el formulario, se agregará la
                nomenclatura "540 - Devuelve con resultado positivo" y se
                grabará el trámite.
              </Typography>
            </li>
            <li>
              <Typography variant="caption" color="primary">
                Ingresará en la causa el texto "Atendido el tiempo transcurrido
                devuélvase el presente exhorto a su tribunal de origen."
                firmando al final del texto con las siglas "/rpa"
              </Typography>
            </li>
            <li>
              <Typography variant="caption" color="primary">
                Finalmente grabará el trámite y hará el envío a despacho para
                continuar nuevamente con el siguiente rit en la planilla excel.
              </Typography>
            </li>
          </ul>
        </Grid>
        <Grid item m={1} ml={3} m3={3}>
          <Typography variant="h4" color="primary" mb={1}>
            Instrucciones de ejecución.
          </Typography>

          <Typography variant="caption" color="primary">
            Este robot funciona trabajando directamente en la plataforma SITCI,
            Ingresando con las credenciales entregadas en el formulario
            simulando a un funcionario con la labor de devolver exhortos en
            materia de civil. Para asegurar su funcionamiento es necesario
            seguir los siguientes pasos:
          </Typography>
          <ul>
            <li>
              <Typography variant="caption" color="primary">
                Primero se debe descargar desde la plataforma SITCI aquellas
                causas en las que se necesite devolver el exhorto. Para eso,
                desde la plafaroma SITCI se debe seguir la siguiente ruta:
              </Typography>
              <ul>
                <li>
                  <Typography variant="caption" color="primary">
                    ingresar a la plataforma{" "}
                    <a href="http://www.civil.pjud/">http://www.civil.pjud/</a>.
                  </Typography>
                </li>
                <li>
                  <Typography variant="caption" color="primary">
                    Desde la pestaña de "Ingreso" seleccionar "Exhortos".
                  </Typography>
                </li>

                <li>
                  <Typography variant="caption" color="primary">
                    Luego desde el panel de la izquierda seleccionar "Exhortado"
                    y filtrar desde la pestaña "Pend. Dev" por fecha la cuál
                    puede ser de un máximo de 6 meses.
                  </Typography>
                </li>
                <li>
                  <Typography variant="caption" color="primary">
                    Finalmente guarda ese listado en formato Excel para
                    posteriormente rellenar el formulario que permite ejecutar
                    el robot.
                  </Typography>
                </li>
              </ul>
            </li>
            <li>
              <Typography variant="caption" color="primary">
                Luego de descargar el excel con los exhortos pendientes de
                envío, es necesario realizar la conexión vía escritorio remoto
                con el equipo que se configuró para la ejecución de los procesos
                de robotización.
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
                Completar el formulario e iniciar el robot. El resultado final
                será entregado vía correo electrónico.
              </Typography>
            </li>
          </ul>
        </Grid>
      </Grid>
    </Box>
  );

  return {
    instructivoDevExh,
    toggleDrawer,
    state,
  };
};
