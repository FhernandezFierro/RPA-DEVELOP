import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import {
  Grid,
  Button,
  Stack,
  IconButton,
  Paper,
  TablePagination,
  TableRow,
  TableHead,
  TableContainer,
  TableBody,
  Table,
  TableCell,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
} from "@mui/material";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import AddIcon from "@mui/icons-material/Add";
import "animate.css";
import "../../../styles/tablepagination.css";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useEffect, useState } from "react";
import {
  startAsociaRobot,
  startDeleteRobot,
  startSetDisponibilidad,
} from "../../../store/rpa";
import { setNavbarText } from "../../../store/app";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1C2536",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const columns = [
  { id: "nro", label: "N°", minWidth: 10, align: "left" },
  {
    id: "nombre_robot",
    label: "Nombre Robot",
    minWidth: 10,
    align: "left",
  },
  { id: "area", label: "Competencia", minWidth: 10, align: "left" },
  { id: "eliminar", label: "Eliminar", minWidth: 10, align: "left" },
  {
    id: "disponibilidad",
    label: "Disponibilidad",
    minWidth: 10,
    align: "left",
  },
];

export const RobotsTribunal = () => {
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);
  // const { id_area } = useSelector((state) => state.auth.tribunal);
  const { tribunales, robotsTribunal, listarobots } = useSelector(
    (state) => state.rpa
  );
  const [trib, setTribunal] = useState("");
  const [robots, setRobots] = useState([]);
  const [robotsFaltantes, setRobotsFaltantes] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filterRobots = (robots, listarobots, id_area) => {
    let ids_robots = robots.map((robot) => {
      return robot.id_listarobot;
    });
    return listarobots.filter(
      (listarobot) =>
        !ids_robots.includes(listarobot.id_listarobot) &&
        id_area.includes(listarobot.id_area)
    );
  };

  const onChangeTribunal = (value) => {
    let [{ id_area }] = tribunales.filter(
      (tribunal) => tribunal.id_tribunal == value
    );

    setTribunal(value);
    setRobots(
      robotsTribunal.filter(
        (robot) => robot.id_tribunal == value && id_area.includes(robot.id_area)
      )
    );
    setRobotsFaltantes(
      filterRobots(
        robotsTribunal.filter((robot) => robot.id_tribunal == value),
        listarobots,
        id_area
      )
    );
  };

  const onNewListarobot = () => {
    MySwal.fire({
      title: "Asociar Robot",
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
                      {robotsFaltantes.length > 0 ? (
                        robotsFaltantes.map((robot) => (
                          <MenuItem
                            key={robot.id_listarobot}
                            value={robot.id_listarobot}
                            property="perro"
                          >
                            {robot.nombre_listarobot}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem key="no-value" value="">
                          No quedan robots para asociar
                        </MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      ),
      showCancelButton: true,
      confirmButtonText: "Asociar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const idLrobot = document.getElementsByName("id_area")[0].value;
        let nombreError = false;
        if (idLrobot.length === 0) {
          nombreError = true;
          MySwal.fire(
            "¡Error!",
            `No se ha seleccionado ningún robot para asociar.`,
            "error"
          );
          return;
        }
        const [{ id_area, id_listarobot, nombre_area, nombre_listarobot }] =
          robotsFaltantes.filter((robot) => robot.id_listarobot == idLrobot);
        // console.log(id_listarobot);
        if (!nombreError) {
          dispatch(
            startAsociaRobot(
              id_area,
              id_listarobot,
              nombre_area,
              nombre_listarobot,
              trib,
              setRobots,
              robots
            )
          );
          let faltantes = robotsFaltantes.filter(
            (faltante) => faltante.id_listarobot !== id_listarobot
          );
          setRobotsFaltantes(faltantes);
        }
      },
    });
  };

  function cambiarDisponibilidad(id_robot) {
    const nuevosRobots = robots.map((robot) => {
      if (robot.id_robot === id_robot) {
        console.log(!robot.disponibilidad);
        let disponibilidad = !robot.disponibilidad;
        dispatch(startSetDisponibilidad(id_robot, disponibilidad));
        return {
          ...robot,
          disponibilidad: !robot.disponibilidad,
        };
      }

      return robot;
    });
    setRobots(nuevosRobots);
  }

  const onDeleteRobot = (
    {
      id_area,
      id_listarobot,
      nombre_area,
      id_robot,
      nombre_robot,
      nombre_tribunal,
    },
    robots
  ) => {
    MySwal.fire({
      title: `¿Seguro que deseas quitar el robot ${nombre_robot} del ${nombre_tribunal}?`,
      text: `Luego podrás asociar este robot nuevamente al Tribunal.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmo",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(robotsFaltantes);
        console.log(id_area, id_listarobot, nombre_area, nombre_robot);

        dispatch(
          startDeleteRobot(
            id_robot,
            nombre_robot,
            nombre_tribunal,
            robots,
            setRobots
          )
        );
        let agregaRobotFaltante = {
          id_area: id_area,
          id_listarobot: id_listarobot,
          nombre_area: nombre_area,
          nombre_listarobot: nombre_robot,
        };
        setRobotsFaltantes([...robotsFaltantes, agregaRobotFaltante]);
      }
    });
  };

  useEffect(() => {
    dispatch(setNavbarText('Asociar robot a Tribunal'))
  }, []);

  return (
    <>
      <Grid container direction="row" spacing={3}>
        <Grid item xs={12}>
          {tribunales[0] ? (
            <form>
              <FormControl fullWidth>
                <InputLabel id="tribunal-label">Selecciona Tribunal</InputLabel>
                <Select
                  labelId="tribunal-label"
                  id="tribunal-select"
                  name="select_tribunal"
                  value={trib}
                  label="Selecciona Tribunal"
                  onChange={(event) => onChangeTribunal(event.target.value)}
                >
                  {tribunales.map((tribunal) => (
                    <MenuItem
                      key={tribunal.id_tribunal}
                      value={tribunal.id_tribunal}
                    >
                      {tribunal.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </form>
          ) : (
            "No hay Tribunales"
          )}
        </Grid>
        <Grid item xs={12}>
          {robots ? (
            <Paper sx={{ width: "100%" }}>
              <TableContainer
                sx={{ maxHeight: "83vh" }}
                className="animate__animated animate__fadeIn"
              >
                <Table stickyHeader aria-label="sticky table" size="small">
                  <TableHead>
                    <StyledTableRow>
                      <StyledTableCell align="left" colSpan={3}>
                        {`TOTAL DE ROBOTS: ${robots.length}`}
                      </StyledTableCell>
                      <StyledTableCell align="right" colSpan={2}>
                        {trib !== "" && (
                          <Button
                            onClick={onNewListarobot}
                            variant="filled"
                            startIcon={<AddIcon />}
                            style={{ outline: "none" }}
                          >
                            <Typography variant="body1" color="background.main">
                              Asociar
                            </Typography>
                          </Button>
                        )}
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      {columns
                        .map((column) => (
                          <StyledTableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                          >
                            {column.label}
                          </StyledTableCell>
                        ))
                        .sort()}
                    </StyledTableRow>
                  </TableHead>
                  <TableBody key="tableBody-users">
                    {robots
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((robot, index) => {
                        return (
                          <StyledTableRow key={robot.id_robot}>
                            <StyledTableCell>{index + 1}</StyledTableCell>
                            <StyledTableCell>
                              {robot.nombre_robot}
                            </StyledTableCell>
                            <StyledTableCell>
                              {robot.nombre_area}
                            </StyledTableCell>
                            <StyledTableCell>
                              <Stack direction="row" spacing={1}>
                                <IconButton
                                  key={`delete-${robot.id_robot}`}
                                  aria-label="Eliminar"
                                  style={{ outline: "none" }}
                                  onClick={() =>
                                    onDeleteRobot({ ...robot }, robots)
                                  }
                                >
                                  <DeleteTwoToneIcon color="error" />
                                </IconButton>
                              </Stack>
                            </StyledTableCell>
                            <StyledTableCell>
                              <Switch
                                checked={robot.disponibilidad}
                                onChange={() =>
                                  cambiarDisponibilidad(robot.id_robot)
                                }
                              />
                            </StyledTableCell>
                          </StyledTableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                className="tablepagination"
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={robots.length}
                rowsPerPage={rowsPerPage}
                labelRowsPerPage="Filas por página"
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          ) : (
            <Skeleton
              variant="rectangular"
              width={"100%"}
              height={"90vh"}
              animation="wave"
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};
