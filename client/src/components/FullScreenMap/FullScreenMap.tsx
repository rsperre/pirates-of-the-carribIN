import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import useQueryParams from "../../hooks/useQueryParams";
import "./FullScreenMap.scss";

const FullScreenMap = () => {
  const queryParams = useQueryParams();
  const coords = queryParams.get("coords");

  const lat = coords ? Number(coords?.split(",")[0].trim()) : 64.581;
  const long = coords ? Number(coords?.split(",")[1].trim()) : 12.601;

  return (
    <MapContainer
      center={[lat, long]}
      zoom={10}
      scrollWheelZoom={true}
      className="fullScreenMap__container"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default FullScreenMap;
