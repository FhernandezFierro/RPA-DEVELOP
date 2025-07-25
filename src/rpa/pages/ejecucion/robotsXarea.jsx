import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PlayCircleTwoToneIcon from "@mui/icons-material/PlayCircleTwoTone";
import HighlightOffTwoToneIcon from "@mui/icons-material/HighlightOffTwoTone";
import { Divider } from "@mui/material";
import "animate.css";
import "../../../styles/robotXarea.css";
import { setNavbarText } from "../../../store/app";
import notFoundImg from "../../../assets/error-404.png";
import { useEffect } from "react";

export const RobotsXarea = () => {
  const dispatch = useDispatch();
  const { id_area } = useParams();

  const { id_tribunal } = useSelector((state) => state.auth.tribunal);

  const robots = useSelector((state) =>
    state.rpa.robotsTribunal.filter(
      (robot) => robot.id_tribunal == id_tribunal && robot.id_area == id_area
    )
  );
  const [{ nombre_area }] = useSelector((state) =>
    state.rpa.areas.filter((area) => area.id_area == id_area)
  );

  useEffect(() => {
    dispatch(setNavbarText(`Robots en competencia ${nombre_area}`));
  }, []);
  
  return (
    <>
      <Grid
        container
        spacing={4}
        direction="row"
        justifyContent="center"
        alignContent="center"
        wrap="wrap"
      >
        {robots.length > 0 ? (
          robots?.map((robot) =>
            robot.disponibilidad ? (
              <Grid item key={robot.id_robot}>
                <Link
                  to={`/${robot.nombre_robot
                    .toLowerCase()
                    .replace(/\s/g, "_")}/${robot.id_robot}`}
                >
                  <Card
                    className="tarjeta animate__animated animate__pulse animate__faster"
                    sx={{
                      display: "flex",
                      width: "300px",
                      "&:hover": {
                        boxShadow: "-1px 10px 10px 0px rgba(128,128,128,0.8)",
                        // transform: '1.5px'
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "rgb(28, 37, 54)",
                        width: "100%",
                      }}
                    >
                      <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography
                          component="div"
                          variant="h5"
                          color="#d5d9e0"
                        >
                          {`${robot.nombre_robot}`}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="#d5d9e0"
                          component="div"
                        >
                          {`${robot.nombre_area}`}
                        </Typography>
                      </CardContent>
                      <Divider
                        variant="middle"
                        sx={{ backgroundColor: "#d5d9e0" }}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          pl: 1,
                          pt: 2,
                          pb: 2,
                        }}
                      >
                        <PlayCircleTwoToneIcon
                          fontSize="medium"
                          sx={{ color: "#a5dc86", mr: 2 }}
                        />
                        <Typography
                          component="div"
                          variant="body2"
                          color="#d5d9e0"
                        >
                          {`Disponible para ejecutar`}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </Link>
              </Grid>
            ) : (
              <Grid item key={robot.id_robot}>
                <Card
                  sx={{
                    display: "flex",
                    width: "300px",
                    "&:hover": {
                      boxShadow: "-1px 10px 10px 0px rgba(128,128,128,0.8)",
                    },
                  }}
                  className="animate__animated animate__headShake "
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "rgb(28, 37, 54)",
                      width: "100%",
                    }}
                  >
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography component="div" variant="h5" color="#d5d9e0">
                        {`${robot.nombre_robot}`}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="#d5d9e0"
                        component="div"
                      >
                        {`${robot.nombre_area}`}
                      </Typography>
                    </CardContent>
                    <Divider
                      variant="middle"
                      sx={{ backgroundColor: "#d5d9e0" }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        pl: 1,
                        pt: 2,
                        pb: 2,
                      }}
                    >
                      <HighlightOffTwoToneIcon
                        fontSize="medium"
                        sx={{ color: "#f27474", mr: 2 }}
                      />
                      <Typography
                        component="div"
                        variant="body2"
                        color="#d5d9e0"
                      >
                        {`No está disponible`}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            )
          )
        ) : (
          <Grid
            container
            spacing={1}
            direction="column"
            justifyContent="center"
            alignItems="center"
            alignContent="center"
            sx={{ height: "80vh" }}
            className="animate__animated animate__fadeIn"
          >
            <Grid item mb={5} className="animate__animated animate__pulse">
              <img
                src={notFoundImg}
                alt="Robot no encontrado"
                style={{ maxWidth: "100%", width: "320px" }}
              />
            </Grid>
            <Grid item>
              <Typography variant="h5" color="initial">
                {`No se encuentran robots asociados a la competencia ${nombre_area}`}
              </Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
};
