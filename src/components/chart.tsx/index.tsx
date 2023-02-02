import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  TimeScale,
  Filler,
  ChartOptions
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import "chartjs-adapter-moment";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { sub, add, format } from 'date-fns'
import api from '../../services/api'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";


ChartJS.register(
  zoomPlugin,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  TimeScale,
  Filler
);

const options: ChartOptions<"line"> = {
  maintainAspectRatio: false,
  scales: {
    x: {
      type: "time" as any,
      time: {
        unit: "hour",
        displayFormats: {
          hour: "HH"
        }
      },
      ticks: { source: "auto" },
      offset: false,
      grid: {
        //display: false,
        drawBorder: true,
        drawOnChartArea: false,
        drawTicks: true
      } as any,
      font: {
        size: 8
      }
    } as any,
    xAxis2: {
      type: "time",
      time: {
        unit: "day"
      }
    },
    y: {
      ticks: {
        source: "auto"
      }
    }
  },
  plugins: {
    zoom: {
      zoom: {
        wheel: {
          enabled: true
        },
        // drag:{
        //   enabled:true
        // },
        mode: "x",
        speed: 100
      } as any,
      pan: {
        enabled: true,
        mode: "x",
        speed: 0.5
      } as any
    }
  }
};

const Chartt = () => {
  const [toDate, setToDate] = useState(new Date());
  const [fromDate, setFromDate] = useState(sub(toDate, { hours: 6 }));
  const [chartData, setChartData] = useState({
    datasets: [
      {
        label: "TemperatureC",
        data: [
          {
            y: 0,
            x: 0
          }
        ],
        fill: true,
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
        spanGaps: true,
        pointHitRadius: 0.5,
        pointBorderWidth: 0,
        pointRadius: 0,
        pointBackgroundColor: "rgba(255, 99, 132, 0.2)",

        borderWidth: 1,
        lineTension: 0.4
      }
    ]
  });

  const Chart = () => {

    // date in utc

    api.ac.getRoomCondtionsBetween(fromDate.toISOString(), toDate.toISOString()).then((res) => {
      console.log(res);
      setChartData({
        datasets: [
          {
            label: "TemperatureC",
            data: res.map((item: any) => ({
              y: item.tempC,
              x: item.createdAt
            })),
            fill: true,
            backgroundColor: ["rgba(255, 99, 132, 0.2)"],
            borderColor: ["rgba(255, 99, 132, 1)"],
            spanGaps: true,
            pointHitRadius: 0.5,
            pointBorderWidth: 0,
            pointRadius: 0,
            pointBackgroundColor: "rgba(255, 99, 132, 0.2)",
            borderWidth: 1,
            lineTension: 0.4
          }
        ]
      });
    })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };

  useEffect(() => {
    Chart();
  }, []);

  function back() {
    setToDate(sub(toDate, { hours: 6 }));
    setFromDate(sub(fromDate, { hours: 6 }));
    Chart();
  }

  function forward() {
    setToDate(add(toDate, { hours: 6 }));
    setFromDate(add(fromDate, { hours: 6 }));
    Chart();
  }
  return (
    <div>
      <div className="flex flex-row items-center space-x-4">
        <span
          className="flex-none inline-flex -space-x-px overflow-hidden rounded-md border bg-white shadow-sm">
          <button
            onClick={back}
            className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative">
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          <span
            className="inline-block px-4 py-2 text-sm font-medium text-gray-700">
            6 Hrs
          </span>

          <button
            onClick={forward}
            className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative">
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </span>
        <span className="flex-auto text-center">
          <span>{format(fromDate, "MM/dd/yyyy HH:mm:ss")}</span><span>-</span><span>{format(toDate, "MM/dd/yyyy HH:mm:ss")}</span>
        </span>
      </div>
      <div style={{ height: "60vh", position: "relative", marginBottom: "1%", padding: "1%" }}>
        <Line
          data={chartData}
          options={options} />
      </div>
    </div>

  );
};

export default Chartt;
