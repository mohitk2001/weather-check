import React from "react";

function ByCity({ Ttemp, Mmin, Mmax, Wweath,location }) {
  return (
    <div className="text-center">
      <h1>
        <i className="fas fa-thermometer-three-quarters"></i> Temperature right
        Now there : {Math.floor(Ttemp)}
        <sup>o</sup>C
      </h1>
      <h4>
        Max Temperature : {Math.floor(Mmax)}
        <sup>o</sup>C
      </h4>
      <h4>
        Min Temperature : {Math.floor(Mmin)}
        <sup>o</sup>C
      </h4>
      <h2>Weather: {Wweath}</h2>
      <h3>Location : {location}</h3>
    </div>
  );
}

export default ByCity;
