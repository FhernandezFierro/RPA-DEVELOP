import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import AddIcon from "@mui/icons-material/Add";
import {
  styled,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Skeleton,
  Stack,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import "animate.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import '../../../styles/tablepagination.css'
import { startDeleteUsuario } from "../../../store/rpa";
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
  { id: "nro", label: "N°", minWidth: 10 },
  { id: "nombre", label: "Nombre", minWidth: 170 },
  { id: "rut", label: "Rut", minWidth: 120 },
  { id: "mail", label: "Mail", minWidth: 120 },
  { id: "acciones", label: "Acciones", minWidth: 20 },
];

export const Usuarios = () => {
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);
  const {id_tribunal, nombre_tribunal} = useSelector((state) => state.auth.tribunal)
  const usuarios = useSelector((state) =>
    state.rpa.usuarios.filter((usuario) => usuario.id_tribunal == id_tribunal)
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onDeleteUsuario = ({ id_usuario, nombre, apellido }) => {
    MySwal.fire({
      title: `¿Seguro que deseas eliminar al usuario ${nombre} ${apellido}?`,
      text: `Se eliminará de manera permanente.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmo",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(startDeleteUsuario({ id_usuario, nombre, apellido }));
      }
    });
  };

  useEffect(() => {
    dispatch(setNavbarText(`Usuarios en ${nombre_tribunal}`))
  }, []);

  return (
    <>
      
      {usuarios ? (
        <Paper sx={{ width: "100%" }}>
          <TableContainer
            sx={{ maxHeight: "83vh" }}
            className="animate__animated animate__fadeIn"
          >
            <Table stickyHeader aria-label="sticky table" size="small">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell align="left" colSpan={3}>
                    {`TOTAL DE USUARIOS: ${usuarios.length}`}
                  </StyledTableCell>
                  <StyledTableCell align="right" colSpan={2}>
                    <Link
                      to="/usuarios/addusuario"
                      style={{ textDecoration: "none" }}
                    >
                      <Button
                        variant="filled"
                        startIcon={<AddIcon />}
                        style={{ outline: "none" }}
                      >
                        <Typography variant="body1" color="background.main">
                          Agregar
                        </Typography>
                      </Button>
                    </Link>
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
              <TableBody key='tableBody-users'>
                {usuarios
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((usuario, index) => {
                    return (
                      <StyledTableRow key={usuario.id_usuario}>
                        <StyledTableCell>{index + 1}</StyledTableCell>
                        <StyledTableCell>{`${usuario.nombre} ${usuario.apellido}`}</StyledTableCell>
                        <StyledTableCell>{usuario.rut}</StyledTableCell>
                        <StyledTableCell>{usuario.correo}</StyledTableCell>
                        <StyledTableCell>
                          <Stack direction="row" spacing={1}>
                            <Link
                              to={`/usuarios/updateusuario/${usuario.id_usuario}`}
                              style={{ textDecoration: "none" }}
                            >
                              <IconButton
                                color="secondary"
                                aria-label="Editar"
                                style={{ outline: "none" }}
                              >
                                <EditTwoToneIcon color="warning" />
                              </IconButton>
                            </Link>
                            <IconButton
                              key={`edit-${usuario.id_usuario}`}
                              aria-label="Eliminar"
                              style={{ outline: "none" }}
                              onClick={() => onDeleteUsuario({ ...usuario })}
                            >
                              <DeleteTwoToneIcon color="error" />
                            </IconButton>
                          </Stack>
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
            count={usuarios.length}
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
    </>
  );
};
