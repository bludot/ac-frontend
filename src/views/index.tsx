import React from 'react';
import Knob from "../components/knob";
import {useState, useEffect} from "react";
import axios from "axios";
import useDebounce from "../utils/useDebounce";
import Switch from "react-switch";
import Slider from "../components/slider";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPowerOff, faRocket} from "@fortawesome/free-solid-svg-icons";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {getACState} from "./service";

export default function Index() {
    const [data, setData] = useState<any>({
        "power": 1,
        "temp": 25,
        "mode": 0,
        "fan": 0,
        "powerful": 0,
        "quiet": 0,
        "swingh": 1,
        "swingv": 1
    });

    const debouncedData = useDebounce(data, 500);
    const [loaded, setLoaded] = useState(false)

    function setDataType<T>(field: string, value: T) {
        setData({
            ...data,
            [field]: value
        })
    }

    function setDataTypeMultiple<T>(fields: string[], values: T[]) {
        const updatedData = fields.reduce((arr, field) => {
            return {...arr, [field]: values[fields.indexOf(field)]}
        }, data)
        setData({...data, ...updatedData})

    }

    // Here's where the API call happens
    // We use useEffect since this is an asynchronous action
    useEffect(
        () => {
            // Make sure we have a value (user has entered something in input)
            if (debouncedData && loaded) {
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

    function sendRequest(debounceData: any) {
        toast.info("Sending request");
        return axios
            .post("/backend/cmd", {...debounceData, mode: 0, quiet: 0})
            .then(() => {
                toast.info("request Sent");
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function getStatus() {
        toast.info("Sending request");
        return getACState().then((res: any) => {
            setData(res)
            setLoaded(true)

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
                            { /* @ts-ignore */}
                            <Switch
                                checked={!!(data.swingh || data.swingv)}
                                onChange={(checked: boolean) => {
                                    setDataTypeMultiple<number>(["swingh", "swingv"], [checked ? 1 : 0, checked ? 1 : 0])

                                }}
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
              <FontAwesomeIcon icon={faRocket}/>
            </span>
                            <Switch
                                checked={data.powerful === 1}
                                onChange={(powerfulBool) => setDataType<number>("powerful", powerfulBool ? 1 : 0)}
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
                        <br/>
                        <div className="center">
                            <div className="temperature">
                                <div
                                    className={`power ${data.power ? "on" : "off"}`}
                                    onClick={() => {
                                        setDataType<number>("power", !data.power ? 1 : 0);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faPowerOff}/>
                                </div>
                                <Knob
                                    cursor={true}
                                    fgColor="#FF645A"
                                    bgColor="#FEFEFE"
                                    inputColor="#FFFFFF"
                                    value={data.temp}
                                    onChange={(temp) => setDataType<number>("temp", temp)}
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
                                            {data.temp}
                                            <span>°C</span>
                                        </span>
                                    )}
                                    className="knob"
                                />
                            </div>
                            <div className="fan-slider">
                                <div className="slider-text">Fan Speed</div>
                                { /* @ts-ignore */}
                                <Slider min={0} max={5} value={data.fan} onChange={(speed) => {
                                    setDataTypeMultiple<number>(["fan"], [speed])
                                }}/>
                            </div>
                        </div>
                    </div>
                    <div className="header">One</div>
                    <div className="right">Right</div>
                </div>) : null}
        </>
    );
}
