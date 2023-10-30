import { useEffect, useState } from "react";
import Controls from "./components/Controls";
import Map from "./components/Map";
import "./styles.css";

const URL = "https://api.wheretheiss.at/v1/satellites/25544";

export default function App() {
  const [coords, setCoords] = useState({
    longitude: 0,
    latitude: 0,
  });

  useEffect(()=>{
    getISSCoords()
    const intervalID = setInterval(() => {
      getISSCoords()
    }, 10000);
    console.log(intervalID)
    return ()=> clearInterval(intervalID)
  },[])
  async function getISSCoords() {
    try {
      const res = await fetch(URL)
      if (res.ok) {
        const data = await res.json()
        setCoords({longitude:data.longitude, latitude:data.latitude})
        return data
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main>
      <Map longitude={coords.longitude} latitude={coords.latitude} />
      <Controls
        longitude={coords.longitude}
        latitude={coords.latitude}
        onRefresh={getISSCoords}
      />
    </main>
  );
}
