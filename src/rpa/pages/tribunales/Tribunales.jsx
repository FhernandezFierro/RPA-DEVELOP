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
import { startDeleteTribunal } from "../../../store/rpa";
import '../../../styles/tablepagination.css'
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
  { id: "nombre_tribunal", label: "Nombre Tribunal", minWidth: 170 },
  { id: "codigo", label: "Código Tribunal", minWidth: 120 },
  { id: "areas", label: "Competencias", minWidth: 120 },
  { id: "ip", label: "Ip asignada", minWidth: 120 },
  { id: "acciones", label: "Acciones", minWidth: 10 },
];

export const Tribunales = () => {
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);
  const { tribunales, areas } = useSelector((state) => state.rpa);

  const filterByIds = (arr, ids) => {
    return arr.filter((item) => ids.includes(item.id_area));
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onDeleteTribunal = ({ id_tribunal, nombre }) => {
    MySwal.fire({
      title: `¿Seguro que deseas eliminar ${nombre}?`,
      text: `Se eliminará de manera permanente.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmo",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(startDeleteTribunal({ id_tribunal, nombre }));
      }
    });
  };

  useEffect(() => {
    dispatch(setNavbarText('Administración de tribunales'))
  }, []);

  return (
    <>
      {tribunales ? (
        <Paper sx={{ width: "100%" }}>
          <TableContainer
            sx={{ maxHeight: "83vh" }}
            className="animate__animated animate__fadeIn"
          >
            <Table stickyHeader aria-label="sticky table" size="small">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell align="left" colSpan={5}>
                    {`TOTAL DE TRIBUNALES: ${tribunales.length}`}
                  </StyledTableCell>
                  <StyledTableCell align="right" colSpan={1}>
                    
                    <Link
                      to="/tribunales/addtribunal"
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
              <TableBody key="tableBody-tribunales">
                {tribunales
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(
                    (
                      { id_tribunal, codigo_tribunal, nombre, ip, id_area },
                      index
                    ) => {
                      return (
                        <StyledTableRow key={id_tribunal}>
                          <StyledTableCell>{index + 1}</StyledTableCell>
                          <StyledTableCell>{nombre}</StyledTableCell>
                          <StyledTableCell>{codigo_tribunal}</StyledTableCell>

                          <StyledTableCell>
                            <ul key={`area-${id_tribunal}`}>
                              {filterByIds(areas, id_area).map((row) => (
                                <li key={row.id_area}>{row.nombre_area}</li>
                              ))}
                            </ul>
                          </StyledTableCell>
                          <StyledTableCell>{ip}</StyledTableCell>
                          <StyledTableCell>
                            <Stack direction="row" spacing={1}>
                              <Link
                                to={`/tribunales/updatetribunal/${id_tribunal}`}
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
                                key={`edit-${id_tribunal}`}
                                aria-label="Eliminar"
                                style={{ outline: "none" }}
                                onClick={() =>
                                  onDeleteTribunal({ id_tribunal, nombre })
                                }
                              >
                                <DeleteTwoToneIcon color="error" />
                              </IconButton>
                            </Stack>
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    }
                  )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
          className="tablepagination"
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={tribunales.length}
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
