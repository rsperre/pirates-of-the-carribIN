import React from "react";
import { shipTypes } from "../../constants/shipTypes";
import "./Boat.scss";

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

const Boat: React.FC<BoatTypes> = ({ boat }) => {
  const shipType = shipTypes.find((type) => type.id === boat.shipType)?.name;

  const boatItem = () => {
    return (
      <div className="boat">
        <h2 className="boat__header">{boat.name}</h2>
        <p className="boat__type">
          <b>Type: </b>
          {shipType ? shipType : "no data"}
        </p>
        <p>
          {boat.latitude}, {boat.longitude}
        </p>
      </div>
    );
  };
  return <div>{boatItem()}</div>;
};

export default Boat;
