import React, { useState } from "react";

import BoatInfo from "../BoatInfo/BoatInfo";
import SendAlert from "../SendAlert/SendAlert";
import "./BoatList.scss";

const BoatList = () => {
  const [boats, setBoats] = useState<Array<String | Number>>([]);

  const date = new Date();
  const startDate = new Date(date.setHours(date.getHours() - 1));
  const endDate = new Date();

  const handleClick = async () => {
    const res = await fetch(
      "https://historic.ais.barentswatch.no/v1/historic/mmsiinarea",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_AIS_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          msgtimefrom: `${startDate.toISOString()}`,
          msgtimeto: `${endDate.toISOString()}`,
          polygon: {
            coordinates: [
              [
                [11.086260679609836, 59.06433541102513],
                [11.086260679609836, 60.000248798776624],
                [10.103943751876727, 60.000248798776624],
                [10.103943751876727, 59.06433541102513],
                [11.086260679609836, 59.06433541102513],
              ],
            ],
            type: "Polygon",
          },
        }),
      }
    );
    const data = await res.json();
    setBoats(data);
  };

  const removeClickHandler = () => {
    setBoats([0]);
  };

  return (
    <div className="boatList">
      <h1>Pirate tracker 3000</h1>
      <button onClick={handleClick}>Find boats</button>
      <button onClick={removeClickHandler}>Remove boats</button>
      <div className="boatList__sendAlert">
        <SendAlert />
      </div>
      <BoatInfo boats={boats} />
    </div>
  );
};

export default BoatList;
