import { useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { MenuOutlined, Logout } from "@mui/icons-material";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Grid,
  Box,
  Menu,
  ListItem,
  ListItemIcon,
  Tooltip,
  ListItemText,
  ListItemButton,
  Chip,
  Stack,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/auth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HdrAutoIcon from "@mui/icons-material/HdrAuto";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import GavelRoundedIcon from "@mui/icons-material/GavelRounded";
import SwapHorizontalCircleRoundedIcon from "@mui/icons-material/SwapHorizontalCircleRounded";
import LanTwoToneIcon from "@mui/icons-material/LanTwoTone";
import CoPresentOutlinedIcon from "@mui/icons-material/CoPresentOutlined";
import PlayCircleFilledWhiteRoundedIcon from "@mui/icons-material/PlayCircleFilledWhiteRounded";
import StopCircleRoundedIcon from "@mui/icons-material/StopCircleRounded";
import "../../styles/navbar.css";
import { startCheckConnection } from "../../store/rpa/thunksEjecuciones";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "animate.css";

export const NavBar = ({ drawerWidth }) => {
  const MySwal = withReactContent(Swal);

  const { id_tribunal } = useSelector((state) => state.auth.tribunal);

  const { role } = useSelector((state) => state.auth);

  const { navbarText, enEjecucion } = useSelector((state) => state.app);
  const { isConnected } = useSelector((state) => state.rpa);
  const dispatch = useDispatch();
  const location = useLocation();
  const handleLogout = () => {
    MySwal.fire({
      title: `¿Seguro que deseas cerrar sesión?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmo",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
        window.localStorage.removeItem("rpa-jwt");
      }
    });
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorEl2, setAnchorEl2] = useState(null);
  const open2 = Boolean(anchorEl2);
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const checkConnect = () => {
    dispatch(startCheckConnection(id_tribunal));
  };

  return (
    <AppBar
      position="fixed"
      sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      style={{ backgroundColor: "#010c1e", borderBottomRightRadius: "1rem" }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          sx={{ mr: 0, display: { sm: "none" } }}
        >
          <MenuOutlined />
        </IconButton>

        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h6" noWrap component="div">
              {`${navbarText}`}
            </Typography>
          </Grid>

          <Grid item>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <Tooltip title="Estado de ejecución">
                  <Stack direction="row" spacing={1}>
                    {enEjecucion.ejecutando ? (
                      <Chip
                        icon={<PlayCircleFilledWhiteRoundedIcon />}
                        color="success"
                        label={`${enEjecucion.nombre_robot}`}
                        className="animate__animated animate__pulse"
                      />
                    ) : (
                      <Chip
                        icon={<StopCircleRoundedIcon />}
                        color="primary"
                        label="Nada en ejecución"
                        className="animate__animated animate__pulse"
                      />
                    )}
                  </Stack>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title="Probar conexión con equipo remoto">
                  <IconButton
                    onClick={checkConnect}
                    size="large"
                    style={{ outline: "none" }}
                    color={isConnected}
                  >
                    <LanTwoToneIcon color={isConnected} />
                  </IconButton>
                </Tooltip>
              </Grid>

              {/* BUTTON FOR SUDO */}

              {
                role==='sudo' &&
                <Grid item>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Tooltip title="Ajustes Globales">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      // sx={{ mt: "7px" }}
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      style={{ outline: "none" }}
                    >
                      <SettingsRoundedIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <NavLink to="/usuariosSudo">
                    <ListItem disablePadding>
                      <ListItemButton divider>
                        <ListItemIcon>
                          <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Usuarios"
                          className="label-text-drawed"
                        />
                      </ListItemButton>
                    </ListItem>
                  </NavLink>

                  <NavLink to="/asociarobot">
                    <ListItem disablePadding>
                      <ListItemButton divider>
                        <ListItemIcon>
                          <SwapHorizontalCircleRoundedIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Asociar Robot"
                          className="label-text-drawed"
                        />
                      </ListItemButton>
                    </ListItem>
                  </NavLink>

                  <NavLink to="/listarobots">
                    <ListItem disablePadding>
                      <ListItemButton divider>
                        <ListItemIcon>
                          <SmartToyOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Lista de Robots" />
                      </ListItemButton>
                    </ListItem>
                  </NavLink>

                  <NavLink to="/areas">
                    <ListItem disablePadding>
                      <ListItemButton divider>
                        <ListItemIcon>
                          <HdrAutoIcon />
                        </ListItemIcon>
                        <ListItemText primary="Áreas" />
                      </ListItemButton>
                    </ListItem>
                  </NavLink>

                  <NavLink to="/tribunales">
                    <ListItem disablePadding>
                      <ListItemButton divider>
                        <ListItemIcon>
                          <AccountBalanceRoundedIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Tribunales"
                          className="label-text-drawed"
                        />
                      </ListItemButton>
                    </ListItem>
                  </NavLink>
                </Menu>
              </Grid>}


              {/* BUTTON FOR ADMIN */}

              { role !== 'user' &&
                <Grid item>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Tooltip title="Ajustes mi Tribunal">
                    <IconButton
                      onClick={handleClick2}
                      size="small"
                      aria-controls={open2 ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open2 ? "true" : undefined}
                      style={{ outline: "none" }}
                    >
                      <GavelRoundedIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Menu
                  anchorEl={anchorEl2}
                  id="account-menu2"
                  open={open2}
                  onClose={handleClose2}
                  onClick={handleClose2}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <NavLink to="/robots">
                    <ListItem disablePadding>
                      <ListItemButton divider>
                        <ListItemIcon>
                          <SmartToyOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Robots" />
                      </ListItemButton>
                    </ListItem>
                  </NavLink>

                  <NavLink to="/usuarios">
                    <ListItem disablePadding>
                      <ListItemButton divider>
                        <ListItemIcon>
                          <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Usuarios"
                          className="label-text-drawed"
                        />
                      </ListItemButton>
                    </ListItem>
                  </NavLink>

                  <NavLink to={`/tribunales/updatetribunalAdmin`}>
                    <ListItem disablePadding>
                      <ListItemButton divider>
                        <ListItemIcon>
                          <AccountBalanceRoundedIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Tribunal"
                          className="label-text-drawed"
                        />
                      </ListItemButton>
                    </ListItem>
                  </NavLink>
                </Menu>
              </Grid>}
              <Grid item>
                <Tooltip title="Cerrar sesión">
                  <IconButton
                    onClick={handleLogout}
                    size="large"
                    style={{ outline: "none" }}
                  >
                    <Logout />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
