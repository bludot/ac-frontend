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
import { Line } from "react-chartjs-2";
import { sub, add, format } from 'date-fns'
import api from '../../services/api'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Select from "../input/select";


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

enum DataType {
  TEMPC = "tempC",
  TEMPF = "tempF",
  HUMIDITY = "humidity"
}

const Chartt = () => {
  const [range, setRange] = useState(6);
  const [dates, setDates] = useState<{ from: Date; to: Date }>({
    from: sub(new Date(), { hours: range }),
    to: new Date()
  });
  const [dataType, setDataType]: [DataType, any] = useState(DataType.TEMPC);

  


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

    api.ac.getRoomCondtionsBetween(dates.from.toISOString(), dates.to.toISOString()).then((res) => {
      console.log(res);
      setChartData({
        datasets: [
          {
            label: "TemperatureC",
            data: res.map((item: any) => ({
              y: item[dataType],
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
  useEffect(() => {
    Chart();
  }, [dates, dataType]);

  function back() {
    setDates({
      from: sub(dates.from, { hours: range }),
      to: sub(dates.to, { hours: range })
    });
  }

  function forward() {
    setDates({
      from: add(dates.from, { hours: range }),
      to: add(dates.to, { hours: range })
    });
  }

  function onSeleted(item: any) {
    setRange(item.value);
    setDates({
      from: sub(new Date(), { hours: item.value }),
      to: new Date()
    });
  }
  function onDataTypeSelected(item: any) {
    setDataType(item.value);
  }

  return (
    <div>
      <div className="flex flex-row items-center space-x-4">
        <span
          className="flex-none inline-flex -space-x-px overflow-visible rounded-md border bg-white shadow-sm">
          <button
            onClick={back}
            className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative">
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <span className="inline-block relative">
            <Select items={[
              {
              id: 0,
              name: "C°",
              value: DataType.TEMPC
            },
            {
              id: 1,
              name: "F°",
              value: DataType.TEMPF
            },
            {
              id: 2,
              name: "Humidity",
              value: DataType.HUMIDITY
            }
            ]} defaultIndex={0} onChange={onDataTypeSelected}/>
          </span>
          <span className="inline-block relative">
            <Select defaultIndex={5} items={new Array(24).fill(0).map((_, i) => ({ id: i, name: `${i+1} Hrs`, value: i+1 }))} onChange={onSeleted}/>
          </span>
          {/* <span
            className="inline-block px-4 py-2 text-sm font-medium text-gray-700">
            6 Hrs
          </span> */}

          <button
            onClick={forward}
            className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative">
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </span>
        <span className="flex-auto text-center">
          <span>{format(dates.from, "MM/dd/yyyy HH:mm:ss")}</span><span>-</span><span>{format(dates.to, "MM/dd/yyyy HH:mm:ss")}</span>
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
