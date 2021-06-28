import React, { useState, useContext } from "react";
import axios from "axios";
import { APIContext } from "./Context";
import ByCity from "./ByCity";
function InputF() {
  const [cityname, setCityname] = useState("");
  const [Ttemp, setTTemp] = useState(0);
  const [Mmin, setMMin] = useState("");
  const [Mmax, setMMax] = useState("");
  const [Wweath, setWWeath] = useState("");
  const [location, setLocation] = useState("")
  const { Checking, setChecking } = useContext(APIContext);
  const WeatherInfo = async () => {
    if(cityname===""){
      alert("You need to fill the place name")
    }
    else if(cityname!==""){
      await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=6fd960ad83de6950204aad83069a028f`
      )
      .then((res) => {
        setTTemp(res.data.main.temp);
        setMMax(res.data.main.temp_max);
        setMMin(res.data.main.temp_min);
        setWWeath(res.data.weather[0].main);
        setLocation(res.data.name)
      })
      .catch((e) => {
        console.log(e);
        alert("Not Found");
      });
    setChecking(true);
    }
  };
  return (
    <>
      <h1 className="text-center">
        <i className="fas fa-cloud-sun"></i>Weather App
      </h1>
      <div id="main" className="p-3 text-center">
        <input
          type="text"
          placeholder="eg:Delhi,Mumbai.."
          onChange={(e) => setCityname(e.target.value)}
        />
        <button className="btn btn-primary my-3" onClick={() => WeatherInfo()}>
          Check Weather
        </button>
      </div>
      <div>
        {Checking && <ByCity Ttemp={Ttemp} Mmin={Mmin} Mmax={Mmax} Wweath={Wweath} location={location}></ByCity>}
      </div>
    </>
  );
}

export default InputF;
