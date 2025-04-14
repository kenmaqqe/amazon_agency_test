import { Route, Routes } from "react-router-dom";
import { Welcome, Weather } from "./pages";

function App() {
  return (
    <section className="welcome">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/weather/:cityname" element={<Weather />} />
      </Routes>
    </section>
  );
}

export default App;
