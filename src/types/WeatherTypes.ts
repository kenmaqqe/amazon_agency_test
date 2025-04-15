export interface WeatherInterface {
  location: {
    name: string;
    region: string;
    country: string;
  };
  current: {
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    temp_c: number;
    wind_kph: number;
    wind_dir: string;
    last_updated: string;
  };
}
