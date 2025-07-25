// import { onAuthStateChanged } from "firebase/auth";

import { Box, Grid, Typography } from "@mui/material";

export const InsArchFam = (state, toggleDrawer) => {
  const instructivoArchFam = (anchor) => (
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
            archivo. Es importante saber que la planilla excel debe ser llenada
            por quién pretende ejecutar el proceso ya que mientras funcione el
            proceso, solo se validará que la causa pueda ser archivada si su
            estado administrativo corresponde a "Concluido". A continuación una
            descripción del proceso paso a paso:
          </Typography>
          <ul>
            <li>
              <Typography variant="caption" color="primary">
                Ingresará con las credenciales entregadas a la plataforma SITFA.
              </Typography>
            </li>
            <li>
              <Typography variant="caption" color="primary">
                Ingresará primer rit de la planilla excel.
              </Typography>
            </li>
            <li>
              <Typography variant="caption" color="primary">
                Verificará estado administrativo en la causa. Si es "Concluida",
                se pintará de color verde inidicando que se archivó. De lo
                contrario, se pintará de color amarillo indicando que no puede
                ser archivada.
              </Typography>
            </li>
            <li>
              <Typography variant="caption" color="primary">
                Se asignará el Juez indicado en el formulario y se agregará la
                nomenclatura "Archívese".
              </Typography>
            </li>
            <li>
              <Typography variant="caption" color="primary">
                Se grabará y se ingresará el texto correspondiente utilizando
                una plantilla creada previamente por el Tribunal. La cuál será
                cerrada inmediatamente y guardada.
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
            Este robot funciona trabajando directamente en la plataforma SITFA,
            Ingresando con las credenciales entregadas en el formulario
            simulando a un funcionario con la labor de archivar causas en
            materia de familia. Para asegurar su funcionamiento es necesario
            seguir los siguientes pasos:
          </Typography>
          <ul>
            <li>
              <Typography variant="caption" color="primary">
                Revisar las credenciales de acceso a la plataforma SITFA
                utilizando Internet Explorer:
              </Typography>
              <ul>
                <li>
                  <Typography variant="caption" color="primary">
                    <a href="http://www.familia.pjud/">
                      http://www.familia.pjud/
                    </a>
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
                Verificar que se haya creado la plantilla "Archivese" en la
                plataforma SITFA para que el robot pueda utilizarla.
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
    instructivoArchFam,
  };
};





