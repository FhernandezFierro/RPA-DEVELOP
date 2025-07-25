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
} from "@mui/material";
import { useCrudListarobots } from "../../hooks/useCrudListarobots";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import AddIcon from "@mui/icons-material/Add";
import "animate.css";
import "../../../styles/tablepagination.css";

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
  {
    id: "nombre_listarobot",
    label: "Nombre Robot",
    minWidth: 10,
    align: "left",
  },
  { id: "area", label: "Competencia", minWidth: 10, align: "left" },
  { id: "acciones", label: "Acciones", minWidth: 10, align: "center" },
];

export const Listarobots = () => {
  
  const {
    onNewListarobot,
    listarobots,
    onUpdateListarobot,
    onDeleteListarobot,
    rowsPerPage,
    page,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useCrudListarobots();

  return (
    <>
      <Grid container spacing={0} direction="row" justifyContent="center">
        <Grid item className="animate__animated animate__fadeIn">
          <Paper sx={{ width: 700 }}>
            <TableContainer sx={{ maxHeight: "83vh" }}>
              <Table stickyHeader aria-label="sticky table" size="small">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell colSpan={3}>
                      {`TOTAL DE ROBOTS: ${listarobots.length}`}
                    </StyledTableCell>
                    <StyledTableCell align="right" colSpan={1}>
                      <Button
                        onClick={onNewListarobot}
                        variant="filled"
                        startIcon={<AddIcon />}
                        style={{ outline: "none" }}
                      >
                        <Typography variant="body1" color="background.main">
                          Agregar
                        </Typography>
                      </Button>
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
                  {listarobots
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((listarobot, index) => {
                      return (
                        <StyledTableRow key={listarobot.id_listarobot}>
                          <StyledTableCell component="th" scope="row">
                            {index + 1}
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            {listarobot.nombre_listarobot}
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            {listarobot.nombre_area}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            <Stack
                              direction="row"
                              spacing={1}
                              justifyContent="center"
                            >
                              <IconButton
                                color="secondary"
                                aria-label="Editar"
                                style={{ outline: "none" }}
                                onClick={() =>
                                  onUpdateListarobot({ ...listarobot })
                                }
                              >
                                <EditTwoToneIcon color="warning" />
                              </IconButton>
                              <IconButton
                                aria-label="Eliminar"
                                style={{ outline: "none" }}
                                onClick={() =>
                                  onDeleteListarobot({ ...listarobot })
                                }
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
              count={listarobots.length}
              rowsPerPage={rowsPerPage}
              labelRowsPerPage="Filas por página"
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
