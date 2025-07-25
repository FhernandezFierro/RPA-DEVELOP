import ApexCharts from "apexcharts";
import { useEffect } from "react";
import { useSelector } from "react-redux";
export const Line = () => {
  const { lineSeries, robotSelected } = useSelector((state) => state.app);
  var optionLine = {
    series: [
      {
        data: lineSeries,
      },
    ],
    chart: {
      type: "area",
      stacked: false,
      height: 400,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "zoom",
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 5,
    },
    title: {
        text: `Periodos de ejecución: ${robotSelected}`,
        style: {
          fontSize: "18px",
        },
      },
    yaxis: {
      title: {
        text: "ejecución exitosa + 1 / ejecución negativa - 1",
      },
    },
    xaxis: {
      type: "datetime",
    },
    noData: {
      text: "No se registran ejecuciones",
      align: "center",
      verticalAlign: "middle",
    },
  };

  useEffect(() => {
    const line = new ApexCharts(document.querySelector("#line"), optionLine);
    line.render();
    return () => {
      line.destroy();
    };
  }, [lineSeries]);

  return <div id={"line"}></div>;
};
