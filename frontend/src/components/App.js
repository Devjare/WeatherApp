import React, { Component } from "react";
import { StrictMode } from "react";
import { render } from "react-dom";
import { createRoot } from 'react-dom/client';

import { Grid } from "@mui/material";

import WeatherInfo from "./WeatherInfo";

export default function App() {
  return (
    <Grid container spacing={1} direction="row" justifyContent="center">
      <WeatherInfo />
    </Grid>
  )
}

const rootElement = document.getElementById("app")
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>)
