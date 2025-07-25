import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  startAddNewListaRobot,
  startDeleteListarobot,
  startUpdateListarobot,
} from "../../store/rpa/thunksListarobots";
import { setNavbarText } from "../../store/app";

export const useCrudListarobots = () => {
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);
  const { areas } = useSelector((state) => state.rpa);
  const { listarobots } = useSelector((state) => state.rpa);
  

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onNewListarobot = () => {
    MySwal.fire({
      title: "Nuevo robot",
      html: (
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
            <form>
              <Grid container spacing={0} justifyContent="left">
                <Grid item xs={12} sx={{ marginTop: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel id="area-nuevo-robot">
                      Competencia robot
                    </InputLabel>
                    <Select
                      labelId="area-nuevo-robot"
                      id="area-nuevo-robot-select"
                      name="id_area"
                      label="Competencia robot"
                    >
                      {areas.map((area) => (
                        <MenuItem key={area.id_area} value={area.id_area}>
                          {area.nombre_area}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sx={{ marginTop: 2 }}>
                  <TextField
                    label="Nombre de robot"
                    type="text"
                    placeholder="Nombre de robot"
                    fullWidth
                    name="nombre_listarobot"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      ),
      showCancelButton: true,
      confirmButtonText: "Agregar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const nombreLrobot =
          document.getElementsByName("nombre_listarobot")[0].form[2].value;
        const areaLrobot =
          document.getElementsByName("nombre_listarobot")[0].form[0].value;
        const nombreArea = document.getElementById(
          "area-nuevo-robot-select"
        ).innerHTML;

        let areaError = false;
        let nombreError = false;

        if (areaLrobot.length === 0) {
          areaError = true;
          MySwal.fire(
            "¡Error!",
            `Debes seleccionar un área de competencia`,
            "error"
          );
          return;
        }
        if (nombreLrobot.length < 3) {
          nombreError = true;
          MySwal.fire(
            "¡Error!",
            `El nombre del robot debe tener al menos 3 caractéres.`,
            "error"
          );
          return;
        }
        if (!areaError && !nombreError) {
          dispatch(
            startAddNewListaRobot({ nombreLrobot, areaLrobot, nombreArea })
          );
        }
      },
    });
  };

  const onUpdateListarobot = ({
    id_listarobot,
    nombre_listarobot,
    id_area,
    nombre_area,
  }) => {
    MySwal.fire({
      title: "Nuevo robot",
      html: (
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
            <form>
              <Grid container spacing={0} justifyContent="left">
                <Grid item xs={12} sx={{ marginTop: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel id="area-nuevo-robot">
                      Competencia robot
                    </InputLabel>
                    <Select
                      labelId="area-nuevo-robot"
                      id="area-nuevo-robot-select"
                      name="id_area"
                      label={nombre_area}
                      defaultValue={id_area}
                    >
                      {areas.map((area) => (
                        <MenuItem key={area.id_area} value={area.id_area}>
                          {area.nombre_area}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sx={{ marginTop: 2 }}>
                  <TextField
                    label="Nombre de robot"
                    type="text"
                    placeholder="Nombre de robot"
                    fullWidth
                    name="nombre_listarobot"
                    variant="outlined"
                    defaultValue={nombre_listarobot}
                  />
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      ),
      showCancelButton: true,
      confirmButtonText: "Actualizar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const nombreLrobot =
          document.getElementsByName("nombre_listarobot")[0].form[2].value;
        const areaLrobot =
          document.getElementsByName("nombre_listarobot")[0].form[0].value;
        const nombreArea = document.getElementById(
          "area-nuevo-robot-select"
        ).innerHTML;

        let areaError = false;
        let nombreError = false;

        if (areaLrobot.length === 0) {
          areaError = true;
          MySwal.fire(
            "¡Error!",
            `Debes seleccionar un área de competencia`,
            "error"
          );
          return;
        }
        if (nombreLrobot.length < 3) {
          nombreError = true;
          MySwal.fire(
            "¡Error!",
            `El nombre del robot debe tener al menos 3 caractéres.`,
            "error"
          );
          return;
        }
        if (!areaError && !nombreError) {
          dispatch(
            startUpdateListarobot({
              nombreLrobot,
              areaLrobot,
              nombreArea,
              id_listarobot,
            })
          );
        }
      },
    });
  };

  const onDeleteListarobot = ({ id_listarobot, nombre_listarobot }) => {
    MySwal.fire({
      title: `¿Seguro que deseas eliminar el robot ${nombre_listarobot}?`,
      text: `Se eliminará de manera permanente.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmo",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(startDeleteListarobot({ id_listarobot, nombre_listarobot }));
      }
    });
  };

  useEffect(() => {
    dispatch(setNavbarText('Listado de Robots'));
  }, []);

  return {
    onNewListarobot,
    listarobots,
    onUpdateListarobot,
    onDeleteListarobot,
    rowsPerPage,
    page,
    handleChangePage,
    handleChangeRowsPerPage,
  };
};
