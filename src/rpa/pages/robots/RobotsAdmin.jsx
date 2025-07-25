import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import {
  Grid,
  Paper,
  TablePagination,
  TableRow,
  TableHead,
  TableContainer,
  TableBody,
  Table,
  TableCell,
  Switch,
} from "@mui/material";
import "animate.css";
import "../../../styles/tablepagination.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { startSetDisponibilidad } from "../../../store/rpa";
import { setNavbarText } from "../../../store/app";

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
    id: "nombre_robot",
    label: "Nombre Robot",
    minWidth: 10,
    align: "left",
  },
  { id: "area", label: "Competencia", minWidth: 10, align: "left" },
  {
    id: "disponibilidad",
    label: "Disponibilidad",
    minWidth: 10,
    align: "left",
  },
];
export const RobotsAdmin = () => {
  const dispatch = useDispatch();
  const { id_tribunal, nombre_tribunal } = useSelector(
    (state) => state.auth.tribunal
  );
  const robots = useSelector((state) =>
    state.rpa.robotsTribunal.filter((robot) => robot.id_tribunal == id_tribunal)
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

  function cambiarDisponibilidad(id_robot) {
    robots.map((robot) => {
      if (robot.id_robot === id_robot) {
        let disponibilidad = !robot.disponibilidad;
        dispatch(startSetDisponibilidad(id_robot, disponibilidad));
        return {
          ...robot,
          disponibilidad: !robot.disponibilidad,
        };
      }
      return robot;
    });
  }

  useEffect(() => {
    dispatch(setNavbarText(`Robots en ${nombre_tribunal}`));
  }, []);

  return (
    <>
      <Grid container direction="row" spacing={3}>
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
                      <StyledTableCell align="left" colSpan={4}>
                        {`TOTAL DE ROBOTS: ${robots.length}`}
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
