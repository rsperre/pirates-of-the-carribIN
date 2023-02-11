import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import { Marker, Popup } from "react-leaflet";
import { shipTypes } from "../../constants/shipTypes";
import L from "leaflet";
import pirateFlag from "../../assets/pirateFlag.png";

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
  number: number;
  boatAmount: number;
};

const BoatMapMarker: React.FC<BoatTypes> = ({ boat, number, boatAmount }) => {
  const [isPirate, setIsPirate] = useState<boolean>(false);
  const [isCops, setIsCops] = useState<boolean>(false);
  const pirate = Math.floor(Math.random() * boatAmount + 1);

  React.useEffect(() => {
    if (boat.shipType === 35 || boat.shipType === 55 || boat.shipType === 51) {
      setIsCops(true);
    }
  });

  React.useEffect(() => {
    if (number === pirate) {
      setIsPirate(true);
    }
  }, [number]);

  React.useEffect(() => {
    console.log(pirate);
  }, [pirate]);

  const blueIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [15, 22],
    iconAnchor: [10, 20],
    popupAnchor: [1, -34],
    shadowSize: [20, 20],
  });
  const greenIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [30, 55],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const redIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [30, 55],
    iconAnchor: [-50, -41],
    popupAnchor: [0, 0],
    shadowSize: [41, 41],
  });

  const pirateIcon = L.icon({
    iconUrl: pirateFlag,
    // shadowUrl: 'leaf-shadow.png',

    iconSize: [48, 60], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [20, 20], // point of the icon which will correspond to marker's location
    popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
  });

  const type = shipTypes.find((type) => type.id === boat.shipType)?.name;
  return (
    <Marker
      icon={isPirate ? pirateIcon : isCops ? greenIcon : blueIcon}
      key={boat.mmsi}
      position={[boat.latitude, boat.longitude]}
    >
      <Popup>
        <h2>{boat.name}</h2>
        <p>
          <b>Type: </b> {isPirate ? "Pirate ship" : type}
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
