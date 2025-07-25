import {
  Drawer,
  Toolbar,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Grid,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import "../../styles/home.css";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export const SideBar = ({ drawerWidth }) => {
  const {
    nombre,
    apellido,
    tribunal: { nombre_tribunal, codigo_tribunal, ip, id_area },
  } = useSelector((state) => state.auth);

  const { areas } = useSelector((state) => state.rpa);

  const filterByIds = (arr, ids) => {
    return arr.filter((item) => ids.includes(item.id_area));
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        // backgroundColor:"#1C2536",
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Typography
            variant="h6"
            noWrap
            sx={{
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#c6cdd7",
              textDecoration: "none",
              textAlign: "center",
            }}
            justifyContent="center"
            className="titulo-sgc"
          >
            RPA PJUD
          </Typography>
        </Link>
      </Toolbar>

      <Divider className="divider-navbar" />

      <List>
        {filterByIds(areas, id_area).map((area) => (
          <NavLink
            to={`/${area.nombre_area.toLowerCase()}/${area.id_area}`}
            key={area.id_area}
          >
            <ListItem disablePadding>
              <ListItemButton divider selected>
                <ListItemIcon>
                  <RemoveIcon />
                </ListItemIcon>
                <ListItemText
                  id="li-buenasPracticas"
                  primary={area.nombre_area}
                />
              </ListItemButton>
            </ListItem>
          </NavLink>
        ))}

        <NavLink to="/transcripción">
          <ListItem disablePadding>
            <ListItemButton divider selected>
              <ListItemIcon>
                <RemoveIcon />
              </ListItemIcon>
              <ListItemText id="li-buenasPracticas" primary="Transcripción" />
            </ListItemButton>
          </ListItem>
        </NavLink>

        <Divider className="divider-navbar" />
      </List>
      <Grid
        container
        direction="column"
        spacing={0}
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 1 }}
      >
        <Grid item>
          <Typography
            variant="caption"
            color="background.main"
          >{`${nombre} ${apellido}`}</Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="caption"
            color="background.main"
          >{`${nombre_tribunal}`}</Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="caption"
            color="background.main"
          >{`Código: ${codigo_tribunal}`}</Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="caption"
            color="background.main"
          >{`IP Máquina: ${ip}`}</Typography>
        </Grid>
      </Grid>
    </Drawer>
  );
};
