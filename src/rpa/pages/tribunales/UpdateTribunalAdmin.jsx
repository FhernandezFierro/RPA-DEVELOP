import {
  TextField,
  Grid,
  Typography,
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import "animate.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "../../../hooks/useForm";
import "../../../styles/addTribunal.css";
import { startUpdateTribunal } from "../../../store/rpa";
import { setNavbarText } from "../../../store/app";
export const UpdateTribunalAdmin = () => {
  const { id_tribunal } = useSelector((state) => state.auth.tribunal);
  const idUpdateTribunal = id_tribunal;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorCheckboxes, setErrorCheckBoxes] = useState("");
  const [nombreTribunal, setNombreTribunal] = useState("");

  const { areas } = useSelector((state) => state.rpa);
  const tribunal = useSelector((state) =>
    state.rpa.tribunales.filter((trib) => trib.id_tribunal == idUpdateTribunal)
  );

  const formData = {
    nombre: "",
    codigoTribunal: "",
    ip: "",
  };

  const formValidations = {
    nombre: [
      (value) => value.length >= 10,
      "Nombre Tribunal debe tener al menos 10 caractéres",
    ],
    ip: [
      (value) => value.split(".").length === 4,
      "Debe contener 4 segmentos separados por '.'",
    ],
  };

  const handleonSettingTribunal = () => {
    setNombreTribunal(tribunal[0].nombre);
    setFormState({
      nombre: tribunal[0].nombre,
      codigoTribunal: tribunal[0].codigo_tribunal,
      ip: tribunal[0].ip,
    });
    setSelectedAreas(tribunal[0].id_area);
  };

  const {
    nombre,
    nombreValid,
    codigoTribunal,
    ip,
    ipValid,
    isFormValid,
    onInputChange,
    formState,
    setFormState,
  } = useForm(formData, formValidations);

  const [selectedAreas, setSelectedAreas] = useState([]);

  const handleCheckboxChange = (id_area, isChecked) => {
    if (isChecked) {
      setSelectedAreas([...selectedAreas, id_area]);
    } else {
      setSelectedAreas(selectedAreas.filter((area) => area !== id_area));
    }
  };

  useEffect(() => {
    dispatch(setNavbarText('Actualizar Tribunal'))
    if (tribunal[0]) {
      handleonSettingTribunal();
    }
  }, [tribunal.length]);

  const onSubmit = (event) => {
    event.preventDefault();

    setFormSubmitted(true);
    if (!isFormValid || selectedAreas.length === 0) {
      if (selectedAreas.length === 0) {
        setErrorCheckBoxes("Debes seleccionar al menos un área.");
        return;
      } else {
        setErrorCheckBoxes("");
      }
      return;
    } else {
      setErrorCheckBoxes("");
    }
    formState.id_area = selectedAreas;
    formState.id_tribunal = tribunal[0].id_tribunal;
    formState.current_tribunal = id_tribunal;
    dispatch(startUpdateTribunal(formState));
    
  };

  return (
    <>
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
            <AccountBalanceIcon />
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
        <Grid item>
          <Typography variant="h5" color="primary">
            {`Actualizar Tribunal`}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6" color="primary">
            {`${nombreTribunal}`}
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
          {tribunal[0] ? (
            <form onSubmit={onSubmit} encType="application/json">
              <Grid container spacing={0}>
                <Grid item xs={12} sx={{ marginTop: 2 }}>
                  <TextField
                    label="Nombre Tribunal"
                    type="text"
                    placeholder="Nombre Tribunal"
                    fullWidth
                    name="nombre"
                    variant="outlined"
                    value={nombre}
                    onChange={onInputChange}
                    error={!!nombreValid && formSubmitted}
                    helperText={nombreValid}
                  />
                </Grid>
                <Grid item xs={12} sx={{ marginTop: 2 }}>
                  <TextField
                    label="Código Tribunal"
                    type="text"
                    placeholder="Código Tribunal"
                    fullWidth
                    name="codigoTribunal"
                    variant="outlined"
                    value={codigoTribunal}
                    onChange={onInputChange}
                    error={codigoTribunal.length >= 3 && formSubmitted}
                    helperText={
                      codigoTribunal.length <= 2
                        ? "Código Tribunal debe tener al menos 3 dígitos."
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={12} sx={{ marginTop: 2 }}>
                  <TextField
                    label="IP Equipo Remoto"
                    type="text"
                    placeholder="IP Equipo Remoto"
                    fullWidth
                    name="ip"
                    variant="outlined"
                    value={ip}
                    onChange={onInputChange}
                    error={!!ipValid && formSubmitted}
                    helperText={ipValid}
                  />
                </Grid>
                <Grid mt={1} item xs={12} sx={{ marginTop: 2 }}>
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="center"
                    spacing={2}
                  >
                    <Grid item>
                      <Typography variant="body1" color="primary">
                        Selecciona áreas de competencia del Tribunal.
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    mt={1}
                    container
                    alignItems="center"
                    justifyContent="center"
                    spacing={2}
                  >
                    {areas.map((area) => (
                      <FormControlLabel
                        key={area.id_area}
                        control={
                          <Checkbox
                            checked={selectedAreas.includes(area.id_area)}
                            className="checkArea"
                            onChange={(e) =>
                              handleCheckboxChange(
                                area.id_area,
                                e.target.checked
                              )
                            }
                            value={area.id_area}
                          />
                        }
                        label={area.nombre_area}
                      />
                    ))}
                  </Grid>
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="left"
                    spacing={2}
                  >
                    <Grid item>
                      <Typography
                        variant="caption"
                        color="error"
                        sx={{ marginLeft: "14px" }}
                      >
                        {errorCheckboxes}
                      </Typography>
                    </Grid>
                  </Grid>
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
                      >
                        Actualizar
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          ) : (
            <Grid
              container
              spacing={0}
              justifyContent="center"
              alignContent="center"
              sx={{ height: "65vh" }}
            >
              <Grid item>
                <Typography variant="h6" color="error">
                  ¡Tribunal no existe!
                </Typography>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
};
