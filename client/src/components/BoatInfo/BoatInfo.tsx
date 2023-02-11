import React, { useState, useEffect } from "react";
import Boat from "../Boat/Boat";
import "./BoatInfo.scss";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import BoatMapMarker from "../BoatMapMarker/BoatMapMarker";

type BoatInfoTypes = {
  boats: (String | Number)[];
};

const BoatList: React.FC<BoatInfoTypes> = ({ boats }) => {
  const [boatDetails, setBoatDetails] = useState<Array<any>>([]);

  const boatInfoFetch = async (boats: any) => {
    const res = await fetch(
      "https://live.ais.barentswatch.no/v1/latest/combined",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_AIS_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({ mmsi: boats }),
      }
    );
    const data = await res.json();
    setBoatDetails(data);
  };

  useEffect(() => {
    if (boats.length > 0) {
      boatInfoFetch(boats);
    }
  }, [boats]);

  return (
    <>
      <div className="BoatInfoMap">
        <MapContainer
          center={[64.581, 12.601]}
          zoom={5}
          scrollWheelZoom={true}
          className="BoatInfoMap__container"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {boatDetails.length > 0 &&
            boatDetails.map((b, index) => {
              return (
                <BoatMapMarker
                  boat={b}
                  number={index}
                  boatAmount={boatDetails.length}
                />
              );
            })}
        </MapContainer>
      </div>
      <div className="BoatInfo">
        {boatDetails.length > 0 &&
          boatDetails.map((boat) => <Boat boat={boat} />)}
      </div>
    </>
  );
};

export default BoatList;
