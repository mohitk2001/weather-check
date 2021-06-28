import React from "react";
function AtLOC({temp,max,min,weath,location}) {
  return (
    <>
      <div className="row text-center my-3">
        <div className="col-12">
          <h1>Weather Info at your Current location</h1>
          <h1>
            <i className="fas fa-thermometer-three-quarters"></i> Temperature
            Now : {Math.floor(temp)}
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
          <h4>Location : {location}</h4>
        </div>
      </div>
    </>
  );
}

export default AtLOC;
