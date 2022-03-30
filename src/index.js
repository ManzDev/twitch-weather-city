import "./components/WeatherCard.js";

const changeColor = (stage) => {
  const COLORS = {
    dawn: "#6767b4",
    day: "#4c4c9b",
    sunset: " #3d3d61",
    night: "#3b4f5e"
  };
  document.documentElement.style.setProperty("--bgcolor", COLORS[stage]);
};

addEventListener("DAY_MOMENT_CHANGE", (ev) => changeColor(ev.detail));
