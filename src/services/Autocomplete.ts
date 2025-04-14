import axiosInstance from "./axiosInstance";

export const autocomplete = (input: string) => {
  return axiosInstance.get(
    `/search.json?key=${import.meta.env.VITE_API_KEY}&q=${input}`
  );
};
