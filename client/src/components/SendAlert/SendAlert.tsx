import React, { useState } from "react";
import "./SendAlert.scss";

const SendAlert = () => {
  const [alert, setAlert] = useState<String>("");

  React.useEffect(() => {
    console.log(alert);
  }, [alert]);

  const handleSendAlert = () => {
    fetch("https://posnotifiedc1579bot.azurewebsites.net/api/notification", {
      method: "POST",
      body: `${alert}`,
    });
  };

  return (
    <div className={"sendAlert"}>
      <input
        className={"sendAlert__input"}
        onChange={(event) => setAlert(event.target.value)}
      ></input>
      <button className={"SendAlert__button"} onClick={handleSendAlert}>
        Send alert
      </button>
    </div>
  );
};

export default SendAlert;
