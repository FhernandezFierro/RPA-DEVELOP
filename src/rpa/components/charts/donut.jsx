import ApexCharts from "apexcharts";
import { useEffect } from "react";
import { useSelector } from "react-redux";
export const Donut = () => {
  const { donutSeries, robotSelected } = useSelector((state) => state.app);
  var colorPalette = ["#a5dc86", "#f27474"];

  var optionDonut = {
    chart: {
      type: "donut",
      width: "100%",
      height: 400,
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        customScale: 0.8,
        donut: {
          size: "75%",
          labels: {
            show: true,
            total: {
              showAlways: true,
              show: true,
              fontSize:"24px"
            },
            value: {
                fontSize:"24px"
              }
          }
        },
        offsetY: 0,
      },
      stroke: {
        show: true,
        curve: "smooth",
        lineCap: "butt",
        colors: undefined,
        width: 2,
        dashArray: 0,
      },
    },
    colors: colorPalette,
    title: {
      text: `Total de ejecuciones: ${robotSelected}`,
      style: {
        fontSize: "18px",
      },
    },
    series: donutSeries,
    labels: ["Éxito", "Error"],
    legend: {
      position: "left",
      offsetY: 300,
    },
    noData: {
      text: "No se registran ejecuciones",
      align: "center",
      verticalAlign: "middle",
    },
  };

  useEffect(() => {
    const donut = new ApexCharts(document.querySelector("#donut"), optionDonut);
    donut.render();
    return () => {
      donut.destroy();
    };
  }, [donutSeries]);

  return <div id={"donut"}></div>;
};
