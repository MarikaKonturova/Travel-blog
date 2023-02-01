import React, {useEffect}  from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";


/* зачем useRef(null) */
const Map = ({ longitude, latitude }) => {
 const NEXT_PUBLIC_MAP_API="pk.eyJ1IjoibWFyaWtha29udHVyb3ZhIiwiYSI6ImNsNHZmcmJxdDE4bGozanMzaTVjYjl0aGoifQ.XthjCSuRlsATknE03ADZTw"
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_API

  const mapContainer = React.useRef(null)
  const map = React.useRef(null)

  useEffect(() => {
    if (mapboxgl.current) return;
    if (longitude, latitude) {
      mapboxgl.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [longitude, latitude],
        zoom: 5,
      });
    }
  }, [longitude, latitude]);
  return <div ref={mapContainer} className="map" />;
};

export default Map;