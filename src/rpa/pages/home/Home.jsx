import {
  Grid,
  Tooltip,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableBody,
  Table,
  TableCell,
  Toolbar,
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  ListItemButton,
  Divider,
  Tabs,
  Tab,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setNavbarText,
  setDonutSeries,
  setLineSeries,
  setRobotSelected,
} from "../../../store/app";
import { Pills, Donut, Line } from "../../components/charts";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { filtraPorArea } from "../../../helpers";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useEffect, useState, useMemo } from "react";
import "../../../styles/home.css";

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
  { id: "robot", label: "Robot", minWidth: 60, align: "left" },
  { id: "fecha", label: "Fecha", minWidth: 10, align: "left" },
  { id: "resultado", label: "Resultado", minWidth: 10, align: "left" },
];

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      sx={{ backgroundColor: "green" }}
      {...other}
    >
      {value === index && (
        <Box
          sx={{ backgroundColor: "rgba(224, 224, 224, 0.2)", height: "428px" }}
        >
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const Home = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState(0);
  const [robotsXarea, setRobotsXArea] = useState([]);
  const { id_tribunal } = useSelector((state) => state.auth.tribunal);
  const { historial, areas } = useSelector((state) => state.rpa);
  const { id_area } = useSelector((state) => state.auth.tribunal);
  const filteredAreas = areas.filter((area) => id_area.includes(area.id_area));
  const byArea = useMemo(
    () => filtraPorArea(filteredAreas, historial),
    [historial]
  );

  const robotsTribunal = useSelector((state) => state.rpa.robotsTribunal);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleListItemClick = ({ id_robot, nombre_robot }) => {
    dispatch(setRobotSelected(nombre_robot));
    // setSelectedItem(nombre_robot);
    let byRobotData = historial.filter((hist) => hist.id_robot === id_robot);
    let dataTrue = byRobotData.filter((data) => data.estado_final === "true");
    let dataFalse = byRobotData.filter((data) => data.estado_final === "false");

    // Paso 1: Crear una copia del arreglo original y convertir la cadena de fecha al formato Date
    const clonedData = byRobotData.map((obj) => {
      const [day, month, year] = obj.fecha.split("/");
      const fecha = new Date(`${year}-${month}-${day}`);
      return { ...obj, fecha };
    });

    // Paso 2: Ordenar el arreglo por fecha, desde la más antigua a la más nueva
    clonedData.sort((a, b) => a.fecha - b.fecha);

    // Paso 3: Crear el arreglo finalData para almacenar los resultados con fechas no repetidas
    const finalData = [];

    // Paso 4: Definir el valor acumulado y recorrer el arreglo para calcularlo y agregar fechas discontinuas
    let valorAcumulado = 0;
    let currentDate = null;

    for (const data of clonedData) {
      const date = data.fecha.getTime();
      // Verificar si hay una fecha previa igual al currentDate
      if (currentDate === null || currentDate !== date) {
        // Agregar un objeto con valor null para la fecha discontinua (día siguiente)
        if (currentDate !== null && date - currentDate > 86400000) {
          finalData.push({ x: currentDate + 86400000, y: null });
        }
        finalData.push({ x: date, y: valorAcumulado });
        currentDate = date;
      }
      valorAcumulado += data.estado_final === "true" ? 1 : -1;
    }

    if (byRobotData.length !== 0) {
      dispatch(setDonutSeries([dataTrue.length, dataFalse.length]));
      dispatch(setLineSeries(finalData));
    } else {
      dispatch(setDonutSeries([]));
      dispatch(setLineSeries([]));
      dispatch(setRobotSelected(''));
    }
  };

  const setRobot = (id_area) => {
    let robots = robotsTribunal.filter(
      (robot) => robot.id_tribunal === id_tribunal && robot.id_area === id_area
    );
    dispatch(setDonutSeries([]));
    setRobotsXArea(robots);
  };

  useEffect(() => {
    dispatch(setNavbarText("Home"));
    dispatch(setDonutSeries([]));
    dispatch(setLineSeries([]));
    dispatch(setRobotSelected(''));
  }, []);

  const handlePillsClick = (areaId) => {
    setRobot(areaId);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" direction="row" spacing={2}>
          {byArea.map((area) => {
            return (
              <Tooltip key={area.id_area} title="Clic para revisar detalle">
                <Grid item onClick={() => handlePillsClick(area.id_area)}>
                  <Pills props={area} />
                </Grid>
              </Tooltip>
            );
          })}
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} md={12} lg={4} xl={4} >
            <Paper>
              <TableContainer
                // sx={{ minWidth:'350px' }}
                className="animate__animated animate__fadeIn"
              >
                <Table stickyHeader aria-label="sticky table" size="small">
                  <TableHead>
                    <StyledTableRow>
                      <StyledTableCell colSpan={4}>
                        {`ÚLTIMAS 10 EJECUCIONES`}
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      {columns.map((column) => (
                        <StyledTableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </StyledTableCell>
                      ))}
                    </StyledTableRow>
                  </TableHead>
                  <TableBody key="tableBody">
                    {historial.slice(0, 10).map((historia, index) => {
                      return (
                        <StyledTableRow key={historia.id_historial}>
                          <StyledTableCell component="th" scope="row">
                            {index + 1}
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            {historia.nombre_robot}
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            {historia.fecha}
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            component="th"
                            scope="row"
                          >
                            {historia.estado_final === "false" ? (
                              <CancelIcon color="error" />
                            ) : (
                              <CheckCircleIcon color="success" />
                            )}
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} md={12} lg={8} xl={8} className="animate__animated animate__fadeIn">
            <Grid container justifyContent="center" sx={{ height: "100%" }}>
              {/* Lista a la izquierda */}
              <Grid item xs={2} sx={{ backgroundColor: "rgb(28, 37, 54)" }}>
                <Toolbar>
                  <Typography
                    variant="h"
                    noWrap
                    sx={{
                      color: "#c6cdd7",
                      textDecoration: "none",
                      textAlign: "center",
                    }}
                    justifyContent="center"
                  >
                    ROBOTS
                  </Typography>
                </Toolbar>

                <Divider className="divider-navbar" />

                <List component="nav">
                  {robotsXarea.map((robot) => (
                    <ListItem
                      disablePadding
                      key={robot.id_robot}
                      onClick={() => handleListItemClick({ ...robot })}
                      className="animate__animated animate__fadeIn"
                    >
                      <ListItemButton divider selected>
                        <ListItemText
                          id={`li-buenasPracticas-${robot.id_robot}`}
                          primary={robot.nombre_robot}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Divider className="divider-navbar" />

              {/* Contenido principal */}
              <Grid item xs={10}>
                <Box
                  sx={{
                    width: "100%",
                    bgcolor: "green",
                    height: 65,
                    alignItems: "center",
                    alignContent: "center",
                  }}
                >
                  <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="Torta" {...a11yProps(0)} />
                    <Tab label="Temporal" {...a11yProps(1)} />
                    {/* <Tab label="% error" {...a11yProps(2)} /> */}
                  </Tabs>
                  <CustomTabPanel value={value} index={0}>
                    <Donut />
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={1}>
                    <Line />
                  </CustomTabPanel>
                  {/* <CustomTabPanel value={value} index={2}>
                    Item Three
                  </CustomTabPanel> */}
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
