import axios from "axios";
import { CityInterface } from "../types";

export const autocomplete = async (input: string) => {
  try {
    const response = await axios.get<CityInterface[]>(
      `/search.json?key=${process.env.VITE_API_KEY}&q=${input}`
    );
    return response;
  } catch (error) {
    console.error("Error fetching autocomplete data:", error);
    throw error;
  }
};
