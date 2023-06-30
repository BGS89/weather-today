import React from "react";

function HourCard({ hour }) {
  const timePattern = /(\d{2}:\d{2})$/;
  const match = hour.time.match(timePattern);
  const extractedTime = match ? match[1] : "No time found";

  return (
    <li key={hour.time_epoch} className="hour-card">
      <p>{extractedTime}</p>
      <img src={hour.condition.icon} alt="" />
      <div className="card-temp">
        <p>{hour.temp_c} C</p>
      </div>
    </li>
  );
}

export default HourCard;
