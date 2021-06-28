import React from 'react';
import './App.css';
import Weather from './Components/Weather';
function App() {
  return (
    <div className="App">
      {/* <i class="fas fa-street-view"></i> */}
      <Weather/>
    </div>
  );
}

export default App;



//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}6fd960ad83de6950204aad83069a028f

// // https://cdnjs.com/libraries/font-awesome/5.10.0
// https://fontawesome.com/