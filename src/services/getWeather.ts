import axiosInstance from "./axiosInstance";

export const getWeather = async (lat: number, lon: number) => {
  return axiosInstance.get(
    `/current.json?key=${import.meta.env.VITE_API_KEY}&q=${lat},${lon}&aqi=no`
  );
};
