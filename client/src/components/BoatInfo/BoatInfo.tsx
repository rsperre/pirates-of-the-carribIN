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
          Authorization:
            "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjBCM0I1NEUyRkQ5OUZCQkY5NzVERDMxNDBDREQ4OEI1QzA5RkFDRjNSUzI1NiIsIng1dCI6IkN6dFU0djJaLTctWFhkTVVETjJJdGNDZnJQTSIsInR5cCI6ImF0K2p3dCJ9.eyJpc3MiOiJodHRwczovL2lkLmJhcmVudHN3YXRjaC5ubyIsIm5iZiI6MTY3NjAyNTQwMSwiaWF0IjoxNjc2MDI1NDAxLCJleHAiOjE2NzYwMjkwMDEsImF1ZCI6ImFpcyIsInNjb3BlIjpbImFpcyJdLCJjbGllbnRfaWQiOiJoYXZhcmQubGFuZ2RhbC5ob3ZkZUBpbm5vdmFzam9ubm9yZ2Uubm86YWNkYyJ9.kmZQ2VH8OxNhp1HJ3b7FYomhMhqTU2ffwOrAGW2p_ieCaiLcKNWbdkSb1-g8sYbGr2SUBPkTvfNN6MNMZHbSVJBolSovcCoaSmLXrKM8_3X7LcyiGd_AUgJUhj5M9Wdi2ydHFlAo3tB6wnduiEKYcmkdamkhlL1aqvlQn13k9yaSuxPmC5wLz9as0yLuDvtJGcY3V6qeIw0F_1LdbVoalZPqfIXocCIbaiZsC3sIKp6wuivdnf_F1ZI22KFHz0kQI_90DTMZv4Ca5YZt3zdd0xsLIz29AtWZDH2ze5IjqjTj52lwGyEHiHffoOPVkHJN5IkJX0UxfM3d_y8PUUR4lu55xZ4ckHzTmC1RVJNy7bY1RSKB1jX2DvjN-qrNCeE-Fds3z9jb6zZkUC2Bq9KL0IyMZydHJIrvK7oUz2DLg95fpsEmYsxp9pqBteA5yEsbNe0ucuNTSqez1JgaqPci2KLfvM7aD5d6J0ZfPgBHyj6HWqI8rsVlMIk-CkMUDTQl1Oi_GN6Wrg6BSiJ-BR0-a8cI2zPvRAaImvmu_WElULL0WM50g7mDAWjYclltwwF6KK_CsPfU-aQL5DnG6Y_1_J_B3ML1XPus-bpqDf9ClUX6gWO-S46iG8zeF7w70iGF-IkSvIC_zpqKNb4jUEpEmAer_DHn7do1jrRaAZxGpvw",
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
          scrollWheelZoom={false}
          className="BoatInfoMap__container"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {boatDetails.length > 0 &&
            boatDetails.map((b) => {
              return <BoatMapMarker boat={b} />;
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
