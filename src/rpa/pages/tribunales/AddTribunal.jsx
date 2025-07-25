import {
  TextField,
  Grid,
  Typography,
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
  Autocomplete,
} from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import "animate.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import data from "../../../assets/tribunales.json";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../../hooks/useForm";
import "../../../styles/addTribunal.css";
import { startAddNewTribunal } from "../../../store/rpa";
import { setNavbarText } from "../../../store/app";

const options = data.rows;
export const AddTribunal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorCheckboxes, setErrorCheckBoxes] = useState("");
  const [trib, setTrib] = useState("");

  const formData = {
    codigo_tribunal: "",
    ip: "",
  };

  const formValidations = {
    codigo_tribunal: [
      (value) => value.length >= 3,
      "Código debe ser mayor a 3 dígitos.",
    ],
    ip: [(value) => value.split('.').length === 4, "Debe contener 4 segmentos separados por '.'"],
  };

  const {
    codigo_tribunal,
    codigo_tribunalValid,
    ip,
    ipValid,
    isFormValid,
    onInputChange,
    formState,
  } = useForm(formData, formValidations);

  const { areas } = useSelector((state) => state.rpa);



  const [checkedItems, setCheckedItems] = useState([]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setCheckedItems((prevCheckedItems) => [...prevCheckedItems, value]);
    } else {
      setCheckedItems((prevCheckedItems) =>
        prevCheckedItems.filter((item) => item !== value)
      );
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid || checkedItems.length === 0) {
      if (checkedItems.length === 0) {
        setErrorCheckBoxes("Debes seleccionar al menos un área.");
        return;
      } else {
        setErrorCheckBoxes("");
      }
      return;
    } else {
      setErrorCheckBoxes("");
    }
    formState.nombre_tribunal = trib;
    formState.id_area = checkedItems;
    dispatch(startAddNewTribunal(formState));
    navigate("/tribunales");
  };

  useEffect(() => {
    dispatch(setNavbarText('Añadir tribunal'))
  }, []);

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
            {`Agregar Tribunal`}
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
          <form onSubmit={onSubmit} encType="application/json">
            <Grid container spacing={0}>
              <Grid item xs={12} sx={{ marginTop: 2 }}>
                <Autocomplete
                  // value={nombre_tribunal}
                  onInputChange={(event, newValue) => {
                    setTrib(newValue);
                  }}
                  id="free-solo-demo"
                  autoHighlight
                  freeSolo
                  options={options.map((option) => option.trib_tribunal)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={trib === "" && formSubmitted}
                      helperText={
                        trib === "" ? "Debes seleccionar un Tribunal" : ""
                      }
                      label="Selecciona Tribunal"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sx={{ marginTop: 2 }}>
                <TextField
                  label="Código Tribunal"
                  type="text"
                  placeholder="Código Tribunal"
                  fullWidth
                  name="codigo_tribunal"
                  variant="outlined"
                  value={codigo_tribunal}
                  onChange={onInputChange}
                  error={!!codigo_tribunalValid && formSubmitted}
                  helperText={codigo_tribunalValid}
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
                  {areas.map((checkbox) => (
                    <Grid item key={checkbox.id_area}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            // checked={checkedItems[index] || false}
                            className="checkArea"
                            value={parseInt(checkbox.id_area)}
                            onChange={handleCheckboxChange}
                          />
                        }
                        label={checkbox.nombre_area}
                      />
                    </Grid>
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
                      Agregar
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
};
