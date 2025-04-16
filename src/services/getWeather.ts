import axios from "axios";

export const getWeather = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(
      `/current.json?key=${process.env.VITE_API_KEY}&q=${lat},${lon}&aqi=no`
    );
    return response;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
