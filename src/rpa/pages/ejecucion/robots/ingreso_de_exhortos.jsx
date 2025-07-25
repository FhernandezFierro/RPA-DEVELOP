import {
  Avatar,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  FormHelperText,
  IconButton,
  Tooltip,
  SwipeableDrawer,
} from "@mui/material";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  setNavbarText,
  startExeIngresoDeExhortos,
} from "../../../../store/app";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { useForm } from "../../../../hooks/useForm2";
import { useParams } from "react-router-dom";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import "../../../../styles/robotHelp.css";
import { InsIngExh } from "../../../components/instructivos";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,
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
  { id: "rit", label: "Rit", minWidth: 60, align: "left" },
  { id: "estado", label: "Estado", minWidth: 70, align: "left" },
  { id: "fecha", label: "Fecha", minWidth: 70, align: "left" },
];

const ingreso_de_exhortos = () => {
  const MySwal = withReactContent(Swal);
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  
  const {instructivoIngExh} = InsIngExh(state, toggleDrawer )

  const dispatch = useDispatch();
  const { id_robot } = useParams();
  
  const { jueces, exhortosCivil, enEjecucion } = useSelector((state) => state.app);
  const [{ nombre_robot }] = useSelector((state) =>
    state.rpa.robotsTribunal.filter((robot) => robot.id_robot == id_robot)
  );
  const { id_tribunal, ip } = useSelector((state) => state.auth.tribunal);
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [disableForm, setDisableForm] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const formData = {
    email: "",
    user_sitci: "",
    pass_sitci: "",
    juez: "",
  };

  const formValidations = {
    email: [[(value) => value.includes("@"), "El correo debe tener una @."]],
    user_sitci: [
      [
        (value) => value.length >= 3,
        "Usuario Sitci debe tener más de 3 letras.",
      ],
      
    ],
    pass_sitci: [
      [
        (value) => value.length >= 3,
        "Contraseña Sitci debe tener más de 3 letras.",
      ],
    ],
    juez: [
      [(value) => value.length >= 3, "No se ha seleccionado ningpun juez."],
    ],
  };

  const {
    email,
    emailValid,
    user_sitci,
    user_sitciValid,
    pass_sitci,
    pass_sitciValid,
    juez,
    juezValid,
    isFormValid,
    onInputChange,
    formState,
  } = useForm(formData, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (enEjecucion.ejecutando) {
      MySwal.fire(
        "¡Error!",
        `Actualmente se está ejecutando otro proceso, espera a que este termine para intentarlo nuevamente. En la parte superior de la página puedes comprobar que proceso está siendo ejecutado.`,
        "error"
      );
      return;
    }
    setDisableForm(true);
    formState.id_robot = id_robot;
    formState.nombre_robot = nombre_robot;
    formState.ip = ip;
    formState.id_tribunal = id_tribunal;
    dispatch(startExeIngresoDeExhortos({ ...formState }));
  };

  useEffect(() => {
    dispatch(setNavbarText("Ingreso de Exhortos"));
  }, []);

  return (
    <Grid container spacing={0} direction="row">
      <Grid item className="animate__animated animate__fadeIn">
        <Grid container spacing={0} justifyContent="right">
          <Grid item>
            <IconButton
              onClick={toggleDrawer("right", true)}
              aria-label="Ayuda"
              size="large"
              sx={{
                color: "primary.main",
                position: "absolute",
                right: 50,
                outline: "0px",
              }}
              style={{ outline: 0 }}
            >
              <Tooltip title="Instrucciones" arrow>
                <HelpRoundedIcon sx={{ fontSize: 30 }} />
              </Tooltip>
            </IconButton>
            <SwipeableDrawer
              anchor={"right"}
              open={state["right"]}
              onClose={toggleDrawer("right", false)}
              onOpen={toggleDrawer("right", true)}
              className="drawerhelp"
            >
              {instructivoIngExh("right")}
            </SwipeableDrawer>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={1}
        direction="row"
        justifyContent="center"
        alignItems="center"
        alignContent="center"
        wrap="wrap"
      >
        <Grid item lg={6}>
          <Grid
            container
            spacing={3}
            direction="row"
            justifyContent="center"
            alignItems="center"
            className="animate__animated animate__fadeIn"
          >
            <Grid item>
              <Avatar
                sizes="normal"
                sx={{ width: 56, height: 56, bgcolor: "#4a6d88" }}
              >
                <SmartToyOutlinedIcon />
              </Avatar>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={1}
            direction="column"
            justifyContent="center"
            alignItems="center"
            className="animate__animated animate__fadeIn"
          >
            <Grid item mt={1}>
              <Typography variant="h5" color="primary">
                {`Configurar Robot`}
              </Typography>
            </Grid>
          </Grid>
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
              <form onSubmit={onSubmit}>
                <Grid container spacing={0}>
                  <Grid item xs={12} sx={{ marginTop: 2 }}>
                    <TextField
                      label="Email"
                      type="email"
                      placeholder="Email"
                      fullWidth
                      name="email"
                      variant="outlined"
                      value={email}
                      onChange={onInputChange}
                      error={!!emailValid && formSubmitted}
                      helperText={emailValid}
                      disabled={disableForm}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ marginTop: 2 }}>
                    <TextField
                      label="Usuario Sitci"
                      type="text"
                      placeholder="Usuario Sitci"
                      fullWidth
                      name="user_sitci"
                      variant="outlined"
                      value={user_sitci}
                      onChange={onInputChange}
                      error={!!user_sitciValid && formSubmitted}
                      helperText={user_sitciValid}
                      disabled={disableForm}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ marginTop: 2 }}>
                    <TextField
                      label="Contraseña Sitci"
                      type="password"
                      placeholder="Contraseña Sitci"
                      fullWidth
                      name="pass_sitci"
                      variant="outlined"
                      value={pass_sitci}
                      onChange={onInputChange}
                      error={!!pass_sitciValid && formSubmitted}
                      helperText={pass_sitciValid}
                      disabled={disableForm}
                    />
                  </Grid>

                  <Grid item xs={12} sx={{ marginTop: 2 }}>
                    <FormControl
                      fullWidth
                      error={!!juezValid && formSubmitted}
                      disabled={disableForm}
                    >
                      <InputLabel id="tipo-usuario-label">
                        Firma Juez
                      </InputLabel>
                      <Select
                        labelId="juez-label"
                        id="juez-select"
                        name="juez"
                        value={juez}
                        label="Firma Juez"
                        onChange={onInputChange}
                        defaultValue={""}
                        error={true}
                      >
                        {jueces?.map((juez) => (
                          <MenuItem
                            key={juez.apellido_paterno
                              .trim()
                              .toLowerCase()
                              .replace(/\w\S*/g, (w) =>
                                w.replace(/^\w/, (c) => c.toUpperCase())
                              )}
                            value={
                              juez.apellido_paterno
                                .trim()
                                .toLowerCase()
                                .replace(/\w\S*/g, (w) =>
                                  w.replace(/^\w/, (c) => c.toUpperCase())
                                ) +
                              " " +
                              juez.apellido_materno
                                .trim()
                                .toLowerCase()
                                .replace(/\w\S*/g, (w) =>
                                  w.replace(/^\w/, (c) => c.toUpperCase())
                                ) +
                              ", " +
                              juez.primer_nombre
                                .trim()
                                .toLowerCase()
                                .replace(/\w\S*/g, (w) =>
                                  w.replace(/^\w/, (c) => c.toUpperCase())
                                ) +
                              " " +
                              juez.segundo_nombre
                                .trim()
                                .toLowerCase()
                                .replace(/\w\S*/g, (w) =>
                                  w.replace(/^\w/, (c) => c.toUpperCase())
                                )
                            }
                          >
                            {juez.apellido_paterno
                              .trim()
                              .toLowerCase()
                              .replace(/\w\S*/g, (w) =>
                                w.replace(/^\w/, (c) => c.toUpperCase())
                              ) +
                              " " +
                              juez.apellido_materno
                                .trim()
                                .toLowerCase()
                                .replace(/\w\S*/g, (w) =>
                                  w.replace(/^\w/, (c) => c.toUpperCase())
                                ) +
                              ", " +
                              juez.primer_nombre
                                .trim()
                                .toLowerCase()
                                .replace(/\w\S*/g, (w) =>
                                  w.replace(/^\w/, (c) => c.toUpperCase())
                                ) +
                              " " +
                              juez.segundo_nombre
                                .trim()
                                .toLowerCase()
                                .replace(/\w\S*/g, (w) =>
                                  w.replace(/^\w/, (c) => c.toUpperCase())
                                )}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>{juezValid}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sx={{ marginTop: 2 }}>
                    <Grid
                      container
                      spacing={0}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item>
                        <Button
                          variant="contained"
                          type="submit"
                          style={{ outline: "none" }}
                          disabled={disableForm}
                        >
                          Ejecutar
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={6}>
          <Paper sx={{ width: 500 }}>
            <TableContainer
              sx={{ maxHeight: "83vh" }}
              className="animate__animated animate__fadeIn"
            >
              <Table stickyHeader aria-label="sticky table" size="small">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell colSpan={4}>
                      {`TOTAL DE EXHORTOS: ${exhortosCivil.length}`}
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
                  {exhortosCivil
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((exhorto, index) => {
                      return (
                        <StyledTableRow key={exhorto.rit}>
                          <StyledTableCell component="th" scope="row">
                            {index + 1}
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            {exhorto.rit}
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            {exhorto.relacionado}
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            {exhorto.fecha}
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
              count={10}
              rowsPerPage={rowsPerPage}
              labelRowsPerPage="Filas por página"
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ingreso_de_exhortos;
