import {
  Avatar,
  Button,
  Grid,
  TextField,
  Typography,
  IconButton,
  Tooltip,
  Box,
  SwipeableDrawer,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import RecordVoiceOverTwoToneIcon from "@mui/icons-material/RecordVoiceOverTwoTone";
import { setNavbarText, startExeTranscripcion } from "../../../store/app";
import { useForm } from "../../../hooks/useForm2";
import FileUpload from "react-material-file-upload";
import "../../../styles/robotHelp.css";
import { InsTranscripcion } from "../../components/instructivos";

export const Transcripcion = () => {
  const [files, setFiles] = useState([]);

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


  const {instructivoTranscripcion} = InsTranscripcion(state, toggleDrawer);

  const dispatch = useDispatch();

  const { id_tribunal } = useSelector((state) => state.auth.tribunal);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [disableForm, setDisableForm] = useState(false);
  const [fileValid, setFileValid] = useState(false);

  const formData = {
    email: "",
  };

  const formValidations = {
    email: [[(value) => value.includes("@"), "El correo debe tener una @."]],
  };

  const { email, emailValid, isFormValid, onInputChange, formState } = useForm(
    formData,
    formValidations
  );

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid || files === null) {
      setFileValid(true);
      return;
    }
    setDisableForm(true);
    formState.id_tribunal = id_tribunal;
    formState.archivo = files[0];
    dispatch(startExeTranscripcion({ ...formState }));
  };

  useEffect(() => {
    dispatch(setNavbarText("Transcripción de audio a texto."));
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
                position: "fixed",
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
              {instructivoTranscripcion("right")}
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
                <RecordVoiceOverTwoToneIcon />
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
                {`Selecciona audio para transcribir`}
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
              <form onSubmit={onSubmit} encType="multipart/form-data">
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
                    <FileUpload
                      title="Clic en Seleccionar o arrastra un archivo de audio."
                      buttonText="Seleccionar"
                      buttonProps={{
                        variant: "outlined",
                      }}
                      typographyProps={{
                        variant: "body2",
                        color: "textSecondary",
                      }}
                      multiple={false}
                      accept={".mp4, .wav, .mp3"}
                      sx={{ borderColor: fileValid && "red" }}
                      value={files}
                      onChange={setFiles}
                      disabled={disableForm}
                    />
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
                          Transcribir
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
