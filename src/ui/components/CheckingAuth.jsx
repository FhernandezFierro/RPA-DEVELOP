import { CircularProgress, Grid } from "@mui/material";
export const CheckingAuth = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: '#c6cdd7', padding: 4 }}
    >
      <Grid
        item
        
        justifyContent='center'
      >
        <CircularProgress color="warning"/>
      </Grid>
    </Grid>
  );
};