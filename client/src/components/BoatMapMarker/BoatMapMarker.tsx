import React from "react";
import "leaflet/dist/leaflet.css";
import { Marker, Popup } from "react-leaflet";
import { shipTypes } from "../../constants/shipTypes";

type BoatType = {
  courseOverGround: string;
  latitude: number;
  longitude: number;
  mmsi: number;
  msgtime: string;
  name: string;
  rateOfTurn: number;
  shipType: number;
  speedOverGround: number;
  trueHeading: number;
};

type BoatTypes = {
  boat: BoatType;
};

const BoatMapMarker: React.FC<BoatTypes> = ({ boat }) => {
  const type = shipTypes.find((type) => type.id === boat.shipType)?.name;
  return (
    <Marker key={boat.mmsi} position={[boat.latitude, boat.longitude]}>
      <Popup>
        <h2>{boat.name}</h2>
        <p>
          <b>Type: </b> {type}
        </p>
        <p>
          <b>lat: </b>
          {boat.latitude}, <b>long: </b>
          {boat.longitude}
        </p>
      </Popup>
    </Marker>
  );
};

export default BoatMapMarker;
