import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
function Weather() {
  const [cityname, setCityname] = useState("");
  const [temp, setTemp] = useState(0);
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [weath, setWeath] = useState("");
  const [long, setLong] = useState("");
  const [lati, setLati] = useState("");
  const [specific, setSpecific] = useState(false);
  //let [data,setData]=useState("")
 
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    console.log("Not Working");
  }
  function showPosition(position) {
    //console.log("Latitude: "+position.coords.latitude +"<br>Longitude:"+position.coords.longitude);
    setLati(position.coords.latitude);
    setLong(position.coords.longitude);
    //console.log(lati)
    //console.log(position)
  }
  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for location.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
      default:break;
    }
  }
 
  useEffect(() => {
    const getCurrentLoc = async () => {
      await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&units=metric&appid=6fd960ad83de6950204aad83069a028f`)
        .then((res) => {
         // console.log(res.data);
          setTemp(res.data.main.temp);
          setMax(res.data.main.temp_max);
          setMin(res.data.main.temp_min);
          setWeath(res.data.weather[0].main);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    if (long !== "" && lati !== "") {
       // console.log("here")
      getCurrentLoc();
    }
    else console.log("not called")
  },[]);
  const WeatherInfo = async() => {
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=6fd960ad83de6950204aad83069a028f`
      )
      .then((res) => {
         // console.log(res.data)
        setTemp(res.data.main.temp);
        setMax(res.data.main.temp_max);
        setMin(res.data.main.temp_min);
        setWeath(res.data.weather[0].main);
      })
      .catch((e) => {
        console.log(e);
        alert("Not Found")
      });
    setSpecific(true)
  };
  return (
    <>
      <div className="container">
        <div className="p-sm-5 p-3" id="box">
          <h1 className="text-center">
            <i className="fas fa-cloud-sun"></i>Weather App
          </h1>
          <div id="main" className="p-3 text-center">
            <input
              type="text"
              placeholder="eg:Delhi....."
              onChange={(e) => setCityname(e.target.value)}
            />
            <button
              className="btn btn-primary my-3"
              onClick={() => WeatherInfo()}
            >
              Check Weather
            </button>
          </div>
          <div className="text-center">
            <div className="row">
              <div className="col-12">
                {!specific && lati !== ""  ? (
                  <>
                    <h1>Weather Info at your Current location</h1>
                    <h1>
                      <i className="fas fa-thermometer-three-quarters"></i>{" "}
                      Temperature Now : {Math.floor(temp)}
                      <sup>o</sup>C
                    </h1>
                    <h4>
                      Max Temperature : {Math.floor(max)}
                      <sup>o</sup>C
                    </h4>
                    <h4>
                      Min Temperature : {Math.floor(min)}
                      <sup>o</sup>C
                    </h4>
                    <h2>Weather: {weath}</h2>
                  </>
                ) : (
                  <>
                  <h1>
                      <i className="fas fa-thermometer-three-quarters"></i>{" "}
                      Temperature right Now there : {Math.floor(temp)}
                      <sup>o</sup>C
                    </h1>
                    <h4>
                      Max Temperature : {Math.floor(max)}
                      <sup>o</sup>C
                    </h4>
                    <h4>
                      Min Temperature : {Math.floor(min)}
                      <sup>o</sup>C
                    </h4>
                    <h2>Weather: {weath}</h2>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Weather;
