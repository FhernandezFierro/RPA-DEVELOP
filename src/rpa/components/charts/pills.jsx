import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import ApexCharts from "apexcharts";
import { useEffect } from "react";
export const Pills = ({
  props: { id_area, nombre_area, historial, progreso },
}) => {
  let valores = historial.map((valor) => valor.valor_acumulado);

  var spark1 = {
    chart: {
      id: "spark" + id_area,
      group: "sparks" + id_area,
      type: "line",
      height: 50,
      sparkline: {
        enabled: true,
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 2,
        opacity: 0.2,
      },
    },
    series: [
      {
        data: valores,
      },
    ],
    stroke: {
      curve: "smooth", // smooth straight stepline
      lineCap: "butt",
      width: 3,
    },
    markers: {
      size: 0,
    },
    colors: progreso > 0 ? ["#a5dc86"] : ["#f27474"],
    tooltip: {
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function formatter(val) {
            return "";
          },
        },
      },
    },
    noData: {
      text: undefined,
      align: "center",
      verticalAlign: "middle",
      offsetX: 0,
      offsetY: 0,
      style: {
        color: undefined,
        fontSize: "14px",
        fontFamily: undefined,
      },
    },
  };
  
  useEffect(() => {
    const chart = new ApexCharts(
      document.querySelector("#spark" + id_area),
      spark1
    );
    chart.render();

    return () => {
      chart.destroy(); // Limpiar el gráfico cuando el componente se desmonte
    };
  }, [historial]);

  return (
    <Card
      className="tarjeta animate__animated animate__pulse animate__faster"
      sx={{
        display: "flex",
        width: "260px",
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
          <Grid container spacing={1} justifyContent={"space-between"}>
            <Grid item>
              <Typography component="div" variant="h5" color="#d5d9e0">
                {nombre_area}
              </Typography>
            </Grid>
            <Grid item>
              <Tooltip title="Total de ejecuciones">
                <Typography
                  component="div"
                  variant="h5"
                  color="#d5d9e0"
                  sx={{ right: 2 }}
                >
                  {historial.length}
                </Typography>
              </Tooltip>
            </Grid>
          </Grid>
        </CardContent>
        <Divider variant="middle" sx={{ backgroundColor: "#d5d9e0" }} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            pl: 1,
            pr: 1,
            pt: 2,
            pb: 2,
          }}
        >
          <div id={"spark" + id_area}></div>
        </Box>
      </Box>
    </Card>
  );
};
