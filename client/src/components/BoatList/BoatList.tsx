import React, { useState } from "react";

import BoatInfo from "../BoatInfo/BoatInfo";

const BoatList = () => {
  const [boats, setBoats] = useState<Array<String | Number>>([]);

  const handleClick = async () => {
    const res = await fetch(
      "https://historic.ais.barentswatch.no/v1/historic/mmsiinarea",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjBCM0I1NEUyRkQ5OUZCQkY5NzVERDMxNDBDREQ4OEI1QzA5RkFDRjNSUzI1NiIsIng1dCI6IkN6dFU0djJaLTctWFhkTVVETjJJdGNDZnJQTSIsInR5cCI6ImF0K2p3dCJ9.eyJpc3MiOiJodHRwczovL2lkLmJhcmVudHN3YXRjaC5ubyIsIm5iZiI6MTY3NjAyNTQwMSwiaWF0IjoxNjc2MDI1NDAxLCJleHAiOjE2NzYwMjkwMDEsImF1ZCI6ImFpcyIsInNjb3BlIjpbImFpcyJdLCJjbGllbnRfaWQiOiJoYXZhcmQubGFuZ2RhbC5ob3ZkZUBpbm5vdmFzam9ubm9yZ2Uubm86YWNkYyJ9.kmZQ2VH8OxNhp1HJ3b7FYomhMhqTU2ffwOrAGW2p_ieCaiLcKNWbdkSb1-g8sYbGr2SUBPkTvfNN6MNMZHbSVJBolSovcCoaSmLXrKM8_3X7LcyiGd_AUgJUhj5M9Wdi2ydHFlAo3tB6wnduiEKYcmkdamkhlL1aqvlQn13k9yaSuxPmC5wLz9as0yLuDvtJGcY3V6qeIw0F_1LdbVoalZPqfIXocCIbaiZsC3sIKp6wuivdnf_F1ZI22KFHz0kQI_90DTMZv4Ca5YZt3zdd0xsLIz29AtWZDH2ze5IjqjTj52lwGyEHiHffoOPVkHJN5IkJX0UxfM3d_y8PUUR4lu55xZ4ckHzTmC1RVJNy7bY1RSKB1jX2DvjN-qrNCeE-Fds3z9jb6zZkUC2Bq9KL0IyMZydHJIrvK7oUz2DLg95fpsEmYsxp9pqBteA5yEsbNe0ucuNTSqez1JgaqPci2KLfvM7aD5d6J0ZfPgBHyj6HWqI8rsVlMIk-CkMUDTQl1Oi_GN6Wrg6BSiJ-BR0-a8cI2zPvRAaImvmu_WElULL0WM50g7mDAWjYclltwwF6KK_CsPfU-aQL5DnG6Y_1_J_B3ML1XPus-bpqDf9ClUX6gWO-S46iG8zeF7w70iGF-IkSvIC_zpqKNb4jUEpEmAer_DHn7do1jrRaAZxGpvw",
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
