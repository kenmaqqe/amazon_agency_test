import { useParams } from "react-router-dom";

const Weather = () => {
  const { cityname } = useParams<{ cityname: string }>();

  return <div>{cityname}</div>;
};

export default Weather;
