import React, { useState } from "react";

import BoatInfo from "../BoatInfo/BoatInfo";

const BoatList = () => {
  const [boats, setBoats] = useState<Array<String | Number>>([]);

  // const apiKey = import.meta.env.VITE_AIS_ACCESS_TOKEN;

  // React.useEffect(() => {
  //   console.log(apiKey);
  // }, [apiKey]);

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
          msgtimefrom: "2023-02-09T00:00:00+00:00",
          msgtimeto: "2023-02-09T23:59:00+00:00",
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
    <>
      <h1>Shipfinder 3000</h1>
      <button onClick={handleClick}>Find boats</button>
      <button onClick={removeClickHandler}>Remove boats</button>
      <BoatInfo boats={boats} />
    </>
  );
};

export default BoatList;
