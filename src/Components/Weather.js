import React, { useState} from "react";
import axios from "axios";
import { APIContext } from "./Context";
import "../App.css";
import InputF from "./InputF";
import AtLOC from "./AtLOC";
function Weather() {
  const [temp, setTemp] = useState(0);
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [weath, setWeath] = useState("");
  const [long, setLong] = useState("");
  const [lati, setLati] = useState("");
  const [code, setCode] = useState("");
  const [Ccode, setCcode] = useState("");
  const [Checking, setChecking] = useState(false);
  const [location, setlocation] = useState("")
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Not Working");
    }
    function showPosition(position) {
      setLati(position.coords.latitude);
      setLong(position.coords.longitude);
    }
    navigator.permissions
      .query({ name: "geolocation" })
      .then(function (result) {
        if (result.state === "granted") {
          navigator.geolocation.getCurrentPosition(showPosition);
        } else if (result.state === "denied") {
          alert("Issue With your location");
        }
      });
  }
  getLocation();
  const CHECH_AT =async () => {
    const getZipcode = async() => {
      await axios
        .get(
          `https://api.opencagedata.com/geocode/v1/json?q=${lati}+${long}&key=dbeb647c77c841ffad7569173af13063`
        )
        .then((res) => {
          //console.log(res.data.results[0]);
          setCode(res.data.results[0].components.postcode);
         // console.log(res.data.results[0].components.country_code);
          setCcode(res.data.results[0].components.country_code);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    const getCurrentLocData = async () => {
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?zip=${code},${Ccode}&units=metric&appid=6fd960ad83de6950204aad83069a028f`
        )
        .then((res) => {
          //console.log(res.data.name);
          setlocation(res.data.name)
          setTemp(res.data.main.temp);
          setMax(res.data.main.temp_max);
          setMin(res.data.main.temp_min);
          setWeath(res.data.weather[0].main);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    await getZipcode();
    await getCurrentLocData();
  };
  return (
    <>
      <div className="container">
        <div className="p-sm-5 p-3" id="box">
          <APIContext.Provider value={{ Checking, setChecking }}>
            <InputF />
          </APIContext.Provider>
          <button className="btn btn-info mt-3" onClick={() => CHECH_AT()}>
            Check At Your Location
          </button>
          {
            location !==""  && <AtLOC temp={temp} max={max} min={min} weath={weath} location={location}/>
          }
        </div>
      </div>
    </>
  );
}
export default Weather;
