import { useCrudAreas } from "../../hooks";
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
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import AddIcon from "@mui/icons-material/Add";
import "animate.css";
import { useState } from "react";
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
  { id: "nombre", label: "Nombre Área", minWidth: 60, align: "left" },
  { id: "acciones", label: "Acciones", minWidth: 70, align: "center" },
];

export const Areas = () => {
  const { areas, onNewArea, onUpdateArea, onDeleteArea } = useCrudAreas();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Grid container spacing={0} direction="row" justifyContent="center">
        <Grid item>
          <Paper sx={{ width: 500 }}>
            <TableContainer
              sx={{ maxHeight: "83vh" }}
              className="animate__animated animate__fadeIn"
            >
              <Table stickyHeader aria-label="sticky table" size="small">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell colSpan={2}>
                      {`TOTAL DE ÁREAS: ${areas.length}`}
                    </StyledTableCell>
                    <StyledTableCell align="right" colSpan={1}>
                      <Button
                        onClick={onNewArea}
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
                  {areas
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((area, index) => {
                      return (
                        <StyledTableRow key={area.id_area}>
                          <StyledTableCell component="th" scope="row">
                            {index + 1}
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            {area.nombre_area}
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
                                onClick={() => onUpdateArea({ ...area })}
                              >
                                <EditTwoToneIcon color="warning" />
                              </IconButton>
                              <IconButton
                                aria-label="Eliminar"
                                style={{ outline: "none" }}
                                onClick={() => onDeleteArea({ ...area })}
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
              count={areas.length}
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
