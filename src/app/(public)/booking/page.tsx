import React from "react";
import CelebrityGrid from "./_component/celebrityGrid";
import Header from "../_components/header";

function Booking() {
  return (
    <div>
      <Header
        title="Booking"
        subtitle="Secure your spot to meet your favorite celebrities. Book now and make unforgettable memories."
      />
      <CelebrityGrid />
    </div>
  );
}

export default Booking;
