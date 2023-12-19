import React, { Component, useEffect, useRef, useState } from "react";
import { Button, Grid, Card, Typography } from "@mui/material";
import Icon from  "@mui/material/Icon"

export default function WeatherInfo() {
  
  const [ weather, setWeather ] = useState(null)
  let intervalId = useRef(0) 
  let coords = useRef([])
  let [ location, setLocation ] = useState("")
  let [ temperature, setTemperature ] = useState({})
   
  function getWeather(position) {
    const lat = position.coords.latitude
    const lon = position.coords.longitude
    coords = [ lat, lon ]
    fetch(`/get-weather?latitude=${lat}&longitude=${lon}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setWeather(data)
        setLocation(data.city)

        setTemperature({
          "temp": data['temperature'],
          "minTemp": data['temperature_min'],
          "maxTemp": data['temperature_max'],
          "unit": "C"
        });
      });
  }

  useEffect(() => { 
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        // once the location is obtained, set the inverval
        intervalId = setInterval(getWeather, 5000, pos)
      })
    }
    return () => {
      clearInterval(intervalId)
      location = ""
      intervalId = 0
      coords = []
    }
  }, [weather]);
  
  function switchUnit() {
    if(temperature.unit == "C") {
      setTemperature({
        "temp": weather['temperature_fahr'],
        "minTemp": weather['temperature_min_fahr'],
        "maxTemp": weather['temperature_max_fahr'],
        "unit": "F"
      });
    } else {
      setTemperature({
        "temp": weather['temperature'],
        "minTemp": weather['temperature_min'],
        "maxTemp": weather['temperature_max'],
        "unit": "C"
      });
    }

  }
  // NOTE: When passing on the js fracion of code an Object {}
  // it raises an error, it needs to be a specific value from
  // primitive datatypes, or a react component
  return (
  <Card sx={{ p: 2 }}>
    <Typography variant="h3" component="h3">
        Weather on {location}
    </Typography>
    <Typography variant="subtitle1">
        {new Date().toLocaleString()}
    </Typography>
    <Grid
      container
      direction="row-reverse"
      justifyContent="space-between"
      alignItems="flex-end">
      <Grid item xs> 
        <Icon sx={{ "fontSize": "64px"}}>
          <img src={weather ? weather.weather_icon : ""} width="100%" height="100%" />
        </Icon>
        <Typography variant="h6">
           {weather ? weather.weather : ""}
        </Typography>
        <Typography variant="subtitle2">
           {weather ? weather.weather_description : ""}
        </Typography>
      </Grid>
      <Grid item xs>
        <Typography variant="h6">
            Humidity: {weather ? weather.humidity : ""}
        </Typography>
      </Grid>
      <Grid item xs>
        <Typography variant="subtitle2">
            Temperature: {temperature.temp} °{temperature.unit}
        </Typography>
        <Typography variant="subtitle2">
            Min. temp.: {temperature.minTemp} °{temperature.unit}
        </Typography>
        <Typography variant="subtitle2">
            Max. temp.: {temperature.maxTemp} °{temperature.unit}
        </Typography>
        <Button variant="contained" onClick={switchUnit}>Switch unit</Button>
      </Grid>
    </Grid>
  </Card>);
}
