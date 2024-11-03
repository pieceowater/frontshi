// server/api/weather.ts
import {defineEventHandler} from 'h3';

export default defineEventHandler(async (event) => {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const city = "Almaty"; // фиксированный город, но можно сделать его параметром
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch weather data");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return {error: "Could not fetch weather data"};
  }
});