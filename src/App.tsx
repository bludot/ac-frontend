import "./styles.css";
import Knob from "./components/knob";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import axios from "axios";
import useDebounce from "./utils/useDebounce";
import Switch from "react-switch";
import Slider from "./components/slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff, faRocket } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [data, setData] = useState(null);
  const [temp, setTemp]: [
    number,
    Dispatch<SetStateAction<number>>
  ] = useState(26);
  const [fanSpeed, setFanSpeed]: [
    number,
    Dispatch<SetStateAction<number>>

  ] = useState(0);
  // @ts-ignore
  const [swing, setSwing]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(true);
  // @ts-ignore
  const [power, setPower]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(true);
  // @ts-ignore
  const [powerful, setPowerful]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false);

  const debouncedData = useDebounce(data, 500);
  const [loaded, setLoaded] = useState()

  if (loaded) {
    // Here's where the API call happens
    // We use useEffect since this is an asynchronous action
    useEffect(
      () => {
        // Make sure we have a value (user has entered something in input)
        if (debouncedData) {
          // Set isSearching state
          // setIsSearching(true);
          // Fire off our API call
          sendRequest(debouncedData).then((results) => {
            // Set back to false since request finished
            //setIsSearching(false);
            // Set results state
            //setResults(results);
          });
        } else {
          //setResults([]);
        }
      },
      // This is the useEffect input array
      // Our useEffect function will only execute if this value changes ...
      // ... and thanks to our hook it will only change if the original ...
      // value (searchTerm) hasn't changed for more than 500ms.
      [debouncedData]
    );
  }

  useEffect(() => {
    setData({ ...data, temp: temp });
  }, [temp]);
  useEffect(() => {
    setData({ ...data, fan: fanSpeed });
  }, [fanSpeed]);
  useEffect(() => {
    setData({ ...data, swingv: swing ? 1 : 0 });
  }, [swing]);
  useEffect(() => {
    setData({ ...data, power: power ? 1 : 0 });
  }, [power]);
  useEffect(() => {
    setData({ ...data, powerful: powerful ? 1 : 0 });
  }, [powerful]);

  function sendRequest(debounceData: any) {
    toast.info("Sending request");
    return axios
      .post("/backend/cmd", debounceData)
      .then(() => {
        toast.info("request Sent");
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function getStatus() {
    toast.info("Sending request");
    return axios
      .get("/backend/status")
      .then((res) => {
        setData(res.data)
        toast.info("request Sent");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getStatus();
  }, [])
  // @ts-ignore
  // @ts-ignore
  return (
    <>
    {loaded ? (
      <div className="app">
        <style>
          {`
            body {
              height: 100vh;
            }
            .temp {
              position: absolute;
              width: 2em;
              height: 1.5em;
              left: 0;
              right: 0;
              bottom: 0;
              top: 0;
              margin: auto;
              color: white;
              font-size: 2em;
              text-align: center;
            }

            .temp span {
              font-size: 0.5em;
              vertical-align: top;
              padding: 0 0.25em;
            }
            .app {
              height: 100vh;
              display: grid;
              grid-template-columns: 50px auto 20%;
              grid-template-rows: 50px calc(100% - 50px);
            }
            .header {
              grid-column: 2 / 3;
              grid-row: 1;
              background: transparent;
            }
            .menu {
              grid-column: 1 / 2;
              grid-row: 1 / 3;
              background: white;
            }
            .main {
              padding: 1em;
              padding-top: 50px;
              grid-column: 2 / 3;
              grid-row: 1 / 3;
              background: #F8F7FA;
              position: relative;
            }
            
            .right {
              grid-column: 3 / 4;
              grid-row: 1 / 3;
              background: #eeebf4;
            }
            .knob {
              background: transparent;
              box-shadow: 0px 0px 150px 0px #f8afae;
              flex: 1 1 auto;
            }
            .center {
              margin: 1em 0;
              display: flex;
              flex-direction: row;
              align-content: space-around;
              align-items: baseline;
            }
            .temperature {
              position: relative;
              flex: 1 1 auto;
            }
            .power {
              position: absolute;
              width: 40px;
              height: 40px;
              border-radius: 100%;
              text-align: center;
              line-height: 44px;
              font-size: 20px;
              left: 0;
              right: 0;
              bottom: -20px;
              margin: auto;
              z-index: 2;
            }

            .power.on {
              color: white;
              background-image: linear-gradient(to bottom right, #E1D1E9, #F8AFAE);
            }
            .power.off {
              color: #ccc;
              background-image: linear-gradient(to bottom right, #FFFFFF, #ccc);
            }
            .fan-slider {
              position: relative;
              width: 100px;
              margin: 0 1em;
            }
            .slider-text {
              position: absolute;
              bottom: 15px;
              left: 0px;
              transform: rotate(-90deg);

              /* Legacy vendor prefixes that you probably don't need... */

              /* Safari */
              -webkit-transform: rotate(-90deg);

              /* Firefox */
              -moz-transform: rotate(-90deg);

              /* IE */
              -ms-transform: rotate(-90deg);

              /* Opera */
              -o-transform: rotate(-90deg);

              /* Internet Explorer */
              filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);
              white-space: nowrap;
              width: 0;
              overflow: visible;
              height: 0;
              font-weight: 300;
              color: #666;
              font-size: 0.75em;
              margin: 0;
            }
            .swing {
              position: absolute;
              top: 0;
              right: 0;
              margin: 1em;
              margin-top: 40px;
              vertical-align: top;
              display: flex;
              align-items: center;
            }
            .swing span {
              font-weight: 300;
              line-height: 40px;
              font-size: 0.75em;
              margin: 0 0.5em;
              color: #666;
            }
            .powerful {
              position: absolute;
              top: 0;
              left: 0;
              margin: 1em;
              margin-top: 40px;
              vertical-align: top;
              display: flex;
              align-items: center;
            }
            .powerful span {
              font-weight: 300;
              line-height: 40px;
              font-size: 0.75em;
              margin: 0 0.5em;
              color: #666;
            }
            .powerful span .svg-inline--fa {
              color: #999;
            }
          `}
        </style>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="menu">Menu</div>
        <div className="main">
          <label className="swing" htmlFor="material-switch">
            <span>Swing</span>
            { /* @ts-ignore */ }
            <Switch
              checked={swing}
              onChange={(checked: boolean) => setSwing(checked)}
              offColor="#DFDBE9"
              onColor="#DFDBE9"
              onHandleColor="#7ED321"
              handleDiameter={15}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 3px rgba(0, 0, 0, 0.6)"
              height={8}
              width={30}
              className="react-switch"
              id="material-switch"
            />
          </label>
          <label className="powerful" htmlFor="material-switch">
            <span>
              <FontAwesomeIcon icon={faRocket} />
            </span>
            <Switch
              checked={powerful}
              onChange={setPowerful}
              offColor="#DFDBE9"
              onColor="#DFDBE9"
              onHandleColor="#7ED321"
              handleDiameter={15}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 3px rgba(0, 0, 0, 0.6)"
              height={8}
              width={30}
              className="react-switch"
              id="material-switch"
            />
          </label>
          <br />
          <div className="center">
            <div className="temperature">
              <div
                className={`power ${power ? "on" : "off"}`}
                onClick={() => {
                  setPower(!power);
                }}
              >
                <FontAwesomeIcon icon={faPowerOff} />
              </div>
              <Knob
                cursor={true}
                fgColor="#FF645A"
                bgColor="#FEFEFE"
                inputColor="#FFFFFF"
                value={temp}
                onChange={setTemp}
                min={10}
                max={32}
                width={250}
                height={250}
                lineCap="round"
                thickness={0.10}
                angleOffset={220}
                angleArc={280}
                displayInput={false}
                displayCustom={() => (
                  <span className="temp">
                    {temp}
                    <span>°C</span>
                  </span>
                )}
                className="knob"
              ></Knob>
            </div>
            <div className="fan-slider">
              <div className="slider-text">Fan Speed</div>
              { /* @ts-ignore */}
              <Slider min={0} max={5} value={fanSpeed} onChange={setFanSpeed} />
            </div>
          </div>
        </div>
        <div className="header">One</div>
        <div className="right">Right</div>
      </div>) : null }
      </>
  );
}
